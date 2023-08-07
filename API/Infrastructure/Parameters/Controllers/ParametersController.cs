using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Infrastructure.Parameters {

    [Route("api/[controller]")]
    public class ParametersController : Controller {

        private readonly IMapper mapper;
        private readonly IParametersRepository parametersRepo;

        public ParametersController(IMapper mapper, IParametersRepository parametersRepo) {
            this.mapper = mapper;
            this.parametersRepo = parametersRepo;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> Get() {
            var x = await parametersRepo.GetAsync();
            return new ResponseWithBody {
                Code = 200,
                Icon = Icons.Info.ToString(),
                Message = ApiMessages.OK(),
                Body = mapper.Map<Parameter, ParameterReadDto>(x)
            };
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] ParameterWriteDto setting) {
            var x = await parametersRepo.GetAsync();
            if (x != null) {
                setting.UserId = x.UserId;
                parametersRepo.Update(mapper.Map<ParameterWriteDto, Parameter>(setting));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = null,
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