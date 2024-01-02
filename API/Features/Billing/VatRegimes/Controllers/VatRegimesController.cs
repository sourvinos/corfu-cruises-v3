using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.VatRegimes {

    [Route("api/[controller]")]
    public class VatRegimesController : ControllerBase {

        #region variables

        private readonly IVatRegimeRepository vatRegimeRepo;
        private readonly IVatRegimeValidation vatRegimeValidation;
        private readonly IMapper mapper;

        #endregion

        public VatRegimesController(IVatRegimeRepository vatRegimeRepo, IVatRegimeValidation vatRegimeValidation, IMapper mapper) {
            this.vatRegimeRepo = vatRegimeRepo;
            this.vatRegimeValidation = vatRegimeValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<VatRegimeListVM>> GetAsync() {
            return await vatRegimeRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<VatRegimeAutoCompleteVM>> GetAutoCompleteAsync() {
            return await vatRegimeRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string id) {
            var x = await vatRegimeRepo.GetByIdAsync(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<VatRegime, VatRegimeReadDto>(x)
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
        public Response Post([FromBody] VatRegimeWriteDto vatRegime) {
            var x = vatRegimeValidation.IsValid(null, vatRegime);
            if (x == 200) {
                var z = vatRegimeRepo.Create(mapper.Map<VatRegimeWriteDto, VatRegime>((VatRegimeWriteDto)vatRegimeRepo.AttachMetadataToPostDto(vatRegime)));
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
        public async Task<Response> Put([FromBody] VatRegimeWriteDto vatRegime) {
            var x = await vatRegimeRepo.GetByIdAsync(vatRegime.Id.ToString());
            if (x != null) {
                var z = vatRegimeValidation.IsValid(x, vatRegime);
                if (z == 200) {
                    vatRegimeRepo.Update(mapper.Map<VatRegimeWriteDto, VatRegime>((VatRegimeWriteDto)vatRegimeRepo.AttachMetadataToPutDto(x, vatRegime)));
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
        public async Task<Response> Delete([FromRoute] string id) {
            var x = await vatRegimeRepo.GetByIdAsync(id);
            if (x != null) {
                vatRegimeRepo.Delete(x);
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