using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.Genders {

    [Route("api/[controller]")]
    public class GendersController : ControllerBase {

        #region variables

        private readonly IGenderRepository genderRepo;
        private readonly IGenderValidation genderValidation;
        private readonly IMapper mapper;

        #endregion

        public GendersController(IGenderRepository genderRepo, IGenderValidation genderValidation, IMapper mapper) {
            this.mapper = mapper;
            this.genderRepo = genderRepo;
            this.genderValidation = genderValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<GenderListVM>> GetAsync() {
            return await genderRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<GenderAutoCompleteVM>> GetAutoCompleteAsync() {
            return await genderRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await genderRepo.GetByIdAsync(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Gender, GenderReadDto>(x)
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
        public Response Post([FromBody] GenderWriteDto gender) {
            var x = genderValidation.IsValid(null, gender);
            if (x == 200) {
                var z = genderRepo.Create(mapper.Map<GenderWriteDto, Gender>((GenderWriteDto)genderRepo.AttachMetadataToPostDto(gender)));
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
        public async Task<Response> Put([FromBody] GenderWriteDto gender) {
            var x = await genderRepo.GetByIdAsync(gender.Id);
            if (x != null) {
                var z = genderValidation.IsValid(x, gender);
                if (z == 200) {
                    genderRepo.Update(mapper.Map<GenderWriteDto, Gender>((GenderWriteDto)genderRepo.AttachMetadataToPutDto(x, gender)));
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
            var x = await genderRepo.GetByIdAsync(id);
            if (x != null) {
                genderRepo.Delete(x);
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