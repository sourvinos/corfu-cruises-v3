using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.Nationalities {

    [Route("api/[controller]")]
    public class NationalitiesController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly INationalityRepository nationalityRepo;
        private readonly INationalityValidation nationalityValidation;

        #endregion

        public NationalitiesController(IMapper mapper, INationalityRepository nationalityRepo, INationalityValidation nationalityValidation) {
            this.mapper = mapper;
            this.nationalityRepo = nationalityRepo;
            this.nationalityValidation = nationalityValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<NationalityListVM>> GetAsync() {
            return await nationalityRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<NationalityAutoCompleteVM>> GetAutoCompleteAsync() {
            return await nationalityRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await nationalityRepo.GetByIdAsync(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Nationality, NationalityReadDto>(x)
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
        public Response Post([FromBody] NationalityWriteDto nationality) {
            var x = nationalityValidation.IsValid(null, nationality);
            if (x == 200) {
                var z = nationalityRepo.Create(mapper.Map<NationalityWriteDto, Nationality>((NationalityWriteDto)nationalityRepo.AttachMetadataToPostDto(nationality)));
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
        public async Task<Response> Put([FromBody] NationalityWriteDto nationality) {
            var x = await nationalityRepo.GetByIdAsync(nationality.Id);
            if (x != null) {
                var z = nationalityValidation.IsValid(x, nationality);
                if (z == 200) {
                    nationalityRepo.Update(mapper.Map<NationalityWriteDto, Nationality>((NationalityWriteDto)nationalityRepo.AttachMetadataToPutDto(x, nationality)));
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
            var x = await nationalityRepo.GetByIdAsync(id);
            if (x != null) {
                nationalityRepo.Delete(x);
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