using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.DocumentTypes {

    [Route("api/[controller]")]
    public class DocumentTypesController : ControllerBase {

        #region variables

        private readonly IDocumentTypeRepository DocumentTypeRepo;
        private readonly IDocumentTypeValidation DocumentTypeValidation;
        private readonly IMapper mapper;

        #endregion

        public DocumentTypesController(IDocumentTypeRepository DocumentTypeRepo, IDocumentTypeValidation DocumentTypeValidation, IMapper mapper) {
            this.DocumentTypeRepo = DocumentTypeRepo;
            this.DocumentTypeValidation = DocumentTypeValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<DocumentTypeListVM>> GetAsync() {
            return await DocumentTypeRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<DocumentTypeAutoCompleteVM>> GetAutoCompleteAsync() {
            return await DocumentTypeRepo.GetAutoCompleteAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await DocumentTypeRepo.GetByIdAsync(id);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<DocumentType, DocumentTypeReadDto>(x)
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
        public Response Post([FromBody] DocumentTypeWriteDto DocumentType) {
            var x = DocumentTypeValidation.IsValid(null, DocumentType);
            if (x == 200) {
                var z = DocumentTypeRepo.Create(mapper.Map<DocumentTypeWriteDto, DocumentType>((DocumentTypeWriteDto)DocumentTypeRepo.AttachMetadataToPostDto(DocumentType)));
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
        public async Task<Response> Put([FromBody] DocumentTypeWriteDto DocumentType) {
            var x = await DocumentTypeRepo.GetByIdAsync(DocumentType.Id);
            if (x != null) {
                var z = DocumentTypeValidation.IsValid(x, DocumentType);
                if (z == 200) {
                    DocumentTypeRepo.Update(mapper.Map<DocumentTypeWriteDto, DocumentType>((DocumentTypeWriteDto)DocumentTypeRepo.AttachMetadataToPutDto(x, DocumentType)));
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
            var x = await DocumentTypeRepo.GetByIdAsync(id);
            if (x != null) {
                DocumentTypeRepo.Delete(x);
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