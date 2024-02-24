using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.CrewSpecialties {

    [Route("api/[controller]")]
    public class CrewSpecialtiesController : ControllerBase {

        #region variables

        private readonly ICrewSpecialtyRepository crewSpecialtyRepo;
        private readonly ICrewSpecialtyValidation crewSpecialtyValidation;
        private readonly IMapper mapper;

        #endregion

        public CrewSpecialtiesController(ICrewSpecialtyRepository crewSpecialtyRepo, ICrewSpecialtyValidation crewSpecialtyValidation, IMapper mapper) {
            this.crewSpecialtyRepo = crewSpecialtyRepo;
            this.crewSpecialtyValidation = crewSpecialtyValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<CrewSpecialtyListVM>> GetAsync() {
            return await crewSpecialtyRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<CrewSpecialtyBrowserStorageVM>> GetForBrowserStorageAsync() {
            return await crewSpecialtyRepo.GetBrowserStorageAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await crewSpecialtyRepo.GetByIdAsync(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<CrewSpecialty, CrewSpecialtyReadDto>(x)
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
        public Response Post([FromBody] CrewSpecialtyWriteDto crewSpecialty) {
            var x = crewSpecialtyValidation.IsValid(null, crewSpecialty);
            if (x == 200) {
                var z = crewSpecialtyRepo.Create(mapper.Map<CrewSpecialtyWriteDto, CrewSpecialty>((CrewSpecialtyWriteDto)crewSpecialtyRepo.AttachMetadataToPostDto(crewSpecialty)));
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
        public async Task<Response> Put([FromBody] CrewSpecialtyWriteDto crewSpecialty) {
            var x = await crewSpecialtyRepo.GetByIdAsync(crewSpecialty.Id);
            if (x != null) {
                var z = crewSpecialtyValidation.IsValid(x, crewSpecialty);
                if (z == 200) {
                    crewSpecialtyRepo.Update(mapper.Map<CrewSpecialtyWriteDto, CrewSpecialty>((CrewSpecialtyWriteDto)crewSpecialtyRepo.AttachMetadataToPutDto(x, crewSpecialty)));
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
            var x = await crewSpecialtyRepo.GetByIdAsync(id);
            if (x != null) {
                crewSpecialtyRepo.Delete(x);
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