using System.Collections.Generic;
using System.Threading.Tasks;
using API.Features.Reservations.Schedules;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.Reservations {

    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase {

        #region variables

        private readonly IHttpContextAccessor httpContext;
        private readonly IMapper mapper;
        private readonly IReservationCalendar reservationCalendar;
        private readonly IReservationReadRepository reservationReadRepo;
        private readonly IReservationSendToEmail reservationSendToEmail;
        private readonly IReservationUpdateRepository reservationUpdateRepo;
        private readonly IReservationValidation reservationValidation;
        private readonly IScheduleRepository scheduleRepo;

        #endregion

        public ReservationsController(IHttpContextAccessor httpContext, IMapper mapper, IReservationCalendar reservationCalendar, IReservationReadRepository reservationReadRepo, IReservationSendToEmail reservationSendToEmail, IReservationUpdateRepository reservationUpdateRepo, IReservationValidation reservationValidation, IScheduleRepository scheduleRepo) {
            this.httpContext = httpContext;
            this.mapper = mapper;
            this.reservationCalendar = reservationCalendar;
            this.reservationReadRepo = reservationReadRepo;
            this.reservationSendToEmail = reservationSendToEmail;
            this.reservationUpdateRepo = reservationUpdateRepo;
            this.reservationValidation = reservationValidation;
            this.scheduleRepo = scheduleRepo;
        }

        [HttpGet("fromDate/{fromDate}/toDate/{toDate}")]
        [Authorize(Roles = "user, admin")]
        public IEnumerable<ReservationCalendarGroupVM> GetForCalendar([FromRoute] string fromDate, string toDate) {
            return reservationCalendar.GetForCalendar(fromDate, toDate);
        }

        [HttpGet("date/{date}")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<ReservationListVM>> GetByDateListAsync([FromRoute] string date) {
            return await reservationReadRepo.GetByDateAsync(date);
        }

        [HttpGet("date/{date}/driver/{driverId}")]
        [Authorize(Roles = "admin")]
        public async Task<ReservationDriverGroupVM> GetByDateAndDriverAsync([FromRoute] string date, int driverId) {
            return await reservationReadRepo.GetByDateAndDriverAsync(date, driverId);
        }

        [HttpGet("refNo/{refNo}")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<ReservationListVM>> GetByRefNoAsync([FromRoute] string refNo) {
            return await reservationReadRepo.GetByRefNoAsync(refNo);
        }

        [HttpGet("{reservationId}")]
        [Authorize(Roles = "user, admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string reservationId) {
            var x = await reservationReadRepo.GetByIdAsync(reservationId, true);
            if (x != null) {
                if (Identity.IsUserAdmin(httpContext) || reservationValidation.IsUserOwner(x.CustomerId)) {
                    return new ResponseWithBody {
                        Code = 200,
                        Icon = Icons.Info.ToString(),
                        Message = ApiMessages.OK(),
                        Body = mapper.Map<Reservation, ReservationReadDto>(x)
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = 490
                    };
                }
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost]
        [Authorize(Roles = "user, admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Post([FromBody] ReservationWriteDto reservation) {
            UpdateDriverIdWithNull(reservation);
            UpdateShipIdWithNull(reservation);
            AttachPortIdToDto(reservation);
            AttachNewRefNoToDto(reservation);
            var z = reservationValidation.IsValidAsync(null, reservation, scheduleRepo);
            if (await z == 200) {
                var x = reservationUpdateRepo.Create(mapper.Map<ReservationWriteDto, Reservation>((ReservationWriteDto)reservationUpdateRepo.AttachMetadataToPostDto(reservation)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = x.PutAt,
                    Message = reservation.RefNo
                };
            } else {
                throw new CustomException() {
                    ResponseCode = await z
                };
            }
        }

        [HttpPut]
        [Authorize(Roles = "user, admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PutAsync([FromBody] ReservationWriteDto reservation) {
            var x = await reservationReadRepo.GetByIdAsync(reservation.ReservationId.ToString(), false);
            if (x != null) {
                if (Identity.IsUserAdmin(httpContext) || reservationValidation.IsUserOwner(x.CustomerId)) {
                    UpdateDriverIdWithNull(reservation);
                    UpdateShipIdWithNull(reservation);
                    var z = reservationValidation.IsValidAsync(x, reservation, scheduleRepo);
                    if (await z == 200) {
                        var i = reservationUpdateRepo.Update(reservation.ReservationId, mapper.Map<ReservationWriteDto, Reservation>((ReservationWriteDto)reservationUpdateRepo.AttachMetadataToPutDto(x, reservation)));
                        return new Response {
                            Code = 200,
                            Icon = Icons.Success.ToString(),
                            Id = i.PutAt,
                            Message = reservation.RefNo
                        };
                    } else {
                        throw new CustomException() {
                            ResponseCode = await z
                        };
                    }
                } else {
                    throw new CustomException() {
                        ResponseCode = 490
                    };
                }
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Delete([FromRoute] string id) {
            var x = await reservationReadRepo.GetByIdAsync(id, false);
            if (x != null) {
                reservationUpdateRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = x.ReservationId.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpDelete("deleteRange")]
        [Authorize(Roles = "admin")]
        public Response DeleteRange([FromBody] string[] ids) {
            reservationUpdateRepo.DeleteRange(ids);
            return new Response {
                Code = 200,
                Icon = Icons.Success.ToString(),
                Id = null,
                Message = ApiMessages.OK()
            };
        }

        [HttpPost("assignToDriver")]
        [Authorize(Roles = "admin")]
        public Response AssignToDriver([FromBody] AssignmentVM criteria) {
            reservationUpdateRepo.AssignToDriver(criteria.Id, criteria.ReservationIds);
            return new Response {
                Code = 200,
                Icon = Icons.Success.ToString(),
                Id = null,
                Message = ApiMessages.OK()
            };
        }

        [HttpPost("assignToPort")]
        [Authorize(Roles = "admin")]
        public Response AssignToPort([FromBody] AssignmentVM criteria) {
            reservationUpdateRepo.AssignToPort(criteria.Id, criteria.ReservationIds);
            return new Response {
                Code = 200,
                Icon = Icons.Success.ToString(),
                Id = null,
                Message = ApiMessages.OK()
            };
        }

        [HttpPost("assignToShip")]
        [Authorize(Roles = "admin")]
        public Response AssignToShip([FromBody] AssignmentVM criteria) {
            reservationUpdateRepo.AssignToShip(criteria.Id, criteria.ReservationIds);
            return new Response {
                Code = 200,
                Icon = Icons.Success.ToString(),
                Id = null,
                Message = ApiMessages.OK()
            };
        }

        [HttpGet("overbookedPax/date/{date}/destinationId/{destinationId}")]
        [Authorize(Roles = "user, admin")]
        public int OverbookedPax([FromRoute] string date, int destinationId) {
            return reservationValidation.OverbookedPax(date, destinationId);
        }

        [HttpGet("boardingPass/{reservationId}")]
        [Authorize(Roles = "user, admin")]
        public async Task<Response> SendBoardingPassToEmailAsync(string reservationId) {
            var x = await reservationReadRepo.GetByIdAsync(reservationId, true);
            if (x != null) {
                if (Identity.IsUserAdmin(httpContext) || reservationValidation.IsUserOwner(x.CustomerId)) {
                    await reservationSendToEmail.SendReservationToEmail(mapper.Map<Reservation, BoardingPassReservationVM>(x));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = x.ReservationId.ToString(),
                        Message = ApiMessages.OK()
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = 490
                    };
                }
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        private ReservationWriteDto AttachPortIdToDto(ReservationWriteDto reservation) {
            reservation.PortId = reservationValidation.GetPortIdFromPickupPointId(reservation);
            reservation.PortAlternateId = reservation.PortId;
            return reservation;
        }

        private ReservationWriteDto AttachNewRefNoToDto(ReservationWriteDto reservation) {
            reservation.RefNo = reservationUpdateRepo.AssignRefNoToNewDto(reservation);
            return reservation;
        }

        private static ReservationWriteDto UpdateDriverIdWithNull(ReservationWriteDto reservation) {
            if (reservation.DriverId == 0) reservation.DriverId = null;
            return reservation;
        }

        private static ReservationWriteDto UpdateShipIdWithNull(ReservationWriteDto reservation) {
            if (reservation.ShipId == 0) reservation.ShipId = null;
            return reservation;
        }

    }

}