using API.Features.Ships;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Features.Registrars {

    [Route("api/[controller]")]
    public class RegistrarsController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IRegistrarRepository registrarRepo;
        private readonly IRegistrarValidation registrarValidation;
        private readonly IShipRepository shipRepo;

        #endregion

        public RegistrarsController(IMapper mapper, IRegistrarRepository registrarRepo, IRegistrarValidation registrarValidation, IShipRepository shipRepo) {
            this.mapper = mapper;
            this.registrarRepo = registrarRepo;
            this.registrarValidation = registrarValidation;
            this.shipRepo = shipRepo;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<RegistrarListVM>> GetAsync() {
            return await registrarRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<RegistrarAutoCompleteVM>> GetAutoCompleteAsync() {
            return await registrarRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await registrarRepo.GetByIdAsync(id, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Registrar, RegistrarReadDto>(x)
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
        public Response Post([FromBody] RegistrarWriteDto registrar) {
            var x = registrarValidation.IsValid(registrar);
            if (x == 200) {
                var z = registrarRepo.Create(mapper.Map<RegistrarWriteDto, Registrar>((RegistrarWriteDto)registrarRepo.AttachMetadataToPostDto(registrar)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
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
        public async Task<Response> Put([FromBody] RegistrarWriteDto registrar) {
            var x = await registrarRepo.GetByIdAsync(registrar.Id, false);
            if (x != null) {
                var z = registrarValidation.IsValid(registrar);
                if (z == 200) {
                    registrarRepo.Update(mapper.Map<RegistrarWriteDto, Registrar>((RegistrarWriteDto)registrarRepo.AttachMetadataToPutDto(x, registrar)));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
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
            var x = await registrarRepo.GetByIdAsync(id, false);
            if (x != null) {
                registrarRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }

        }

        [HttpGet("[action]/{shipId}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> ValidateForManifest([FromRoute] int shipId) {
            var x = await shipRepo.GetByIdAsync(shipId, false);
            if (x != null) {
                var z = await this.registrarRepo.ValidateForManifest(shipId);
                return new Response {
                    Code = z ? 200 : 499,
                    Icon = Icons.Info.ToString(),
                    Message = z ? ApiMessages.OK() : ApiMessages.InvalidRegistrarsForManifest()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }

        }

    }

}