using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.ShipRoutes {

    [Route("api/[controller]")]
    public class ShipRoutesController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IShipRouteRepository shipRouteRepo;
        private readonly IShipRouteValidation shipRouteValidation;

        #endregion

        public ShipRoutesController(IMapper mapper, IShipRouteRepository shipRouteRepo, IShipRouteValidation shipRouteValidation) {
            this.mapper = mapper;
            this.shipRouteRepo = shipRouteRepo;
            this.shipRouteValidation = shipRouteValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ShipRouteListVM>> GetAsync() {
            return await shipRouteRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<ShipRouteAutoCompleteVM>> GetAutoCompleteAsync() {
            return await shipRouteRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await shipRouteRepo.GetByIdAsync(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<ShipRoute, ShipRouteReadDto>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public Response Post([FromBody] ShipRouteWriteDto shipRoute) {
            var x = shipRouteValidation.IsValid(null, shipRoute);
            if (x == 200) {
                var z = shipRouteRepo.Create(mapper.Map<ShipRouteWriteDto, ShipRoute>((ShipRouteWriteDto)shipRouteRepo.AttachMetadataToPostDto(shipRoute)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = z.Id.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = x
                };
            }
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] ShipRouteWriteDto shipRoute) {
            var x = await shipRouteRepo.GetByIdAsync(shipRoute.Id);
            if (x != null) {
                var z = shipRouteValidation.IsValid(x, shipRoute);
                if (z == 200) {
                    shipRouteRepo.Update(mapper.Map<ShipRouteWriteDto, ShipRoute>((ShipRouteWriteDto)shipRouteRepo.AttachMetadataToPutDto(x, shipRoute)));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = x.Id.ToString(),
                        Message = ApiMessages.OK()
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = z
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
        public async Task<Response> Delete([FromRoute] int id) {
            var x = await shipRouteRepo.GetByIdAsync(id);
            if (x != null) {
                shipRouteRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = x.Id.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}