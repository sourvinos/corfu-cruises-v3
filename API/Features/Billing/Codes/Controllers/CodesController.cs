using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Codes {

    [Route("api/[controller]")]
    public class CodesController : ControllerBase {

        #region variables

        private readonly ICodeRepository codeRepo;
        private readonly ICodeValidation codeValidation;
        private readonly IMapper mapper;

        #endregion

        public CodesController(ICodeRepository codeRepo, ICodeValidation codeValidation, IMapper mapper) {
            this.codeRepo = codeRepo;
            this.codeValidation = codeValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<CodeListVM>> GetAsync() {
            return await codeRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<CodeAutoCompleteVM>> GetAutoCompleteAsync() {
            return await codeRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string id) {
            var x = await codeRepo.GetByIdAsync(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Code, CodeReadDto>(x)
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
        public Response Post([FromBody] CodeWriteDto code) {
            var x = codeValidation.IsValid(null, code);
            if (x == 200) {
                var z = codeRepo.Create(mapper.Map<CodeWriteDto, Code>((CodeWriteDto)codeRepo.AttachMetadataToPostDto(code)));
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
        public async Task<Response> Put([FromBody] CodeWriteDto code) {
            var x = await codeRepo.GetByIdAsync(code.Id.ToString());
            if (x != null) {
                var z = codeValidation.IsValid(x, code);
                if (z == 200) {
                    codeRepo.Update(mapper.Map<CodeWriteDto, Code>((CodeWriteDto)codeRepo.AttachMetadataToPutDto(x, code)));
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
            var x = await codeRepo.GetByIdAsync(id);
            if (x != null) {
                codeRepo.Delete(x);
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