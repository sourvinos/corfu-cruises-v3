using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Parameters {

    [Route("api/[controller]")]
    public class BillingParametersController : Controller {

        private readonly IMapper mapper;
        private readonly IBillingParametersRepository parametersRepo;
        private readonly IBillingParameterValidation parameterValidation;

        public BillingParametersController(IMapper mapper, IBillingParametersRepository parametersRepo, IBillingParameterValidation parameterValidation) {
            this.mapper = mapper;
            this.parametersRepo = parametersRepo;
            this.parameterValidation = parameterValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> Get() {
            var x = await parametersRepo.GetAsync();
            return new ResponseWithBody {
                Code = 200,
                Icon = Icons.Info.ToString(),
                Message = ApiMessages.OK(),
                Body = mapper.Map<BillingParameter, ParameterReadDto>(x)
            };
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] ParameterWriteDto parameter) {
            var x = await parametersRepo.GetAsync();
            if (x != null) {
                var z = parameterValidation.IsValid(x, parameter);
                if (z == 200) {
                    parametersRepo.Update(mapper.Map<ParameterWriteDto, BillingParameter>((ParameterWriteDto)parametersRepo.AttachMetadataToPutDto(x, parameter)));
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

    }

}