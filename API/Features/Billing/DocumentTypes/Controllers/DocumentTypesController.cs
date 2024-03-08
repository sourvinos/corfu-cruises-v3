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

        private readonly IDocumentTypeRepository documentTypeRepo;
        private readonly IDocumentTypeValidation documentTypeValidation;
        private readonly IMapper mapper;

        #endregion

        public DocumentTypesController(IDocumentTypeRepository DocumentTypeRepo, IDocumentTypeValidation DocumentTypeValidation, IMapper mapper) {
            this.documentTypeRepo = DocumentTypeRepo;
            this.documentTypeValidation = DocumentTypeValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<DocumentTypeListVM>> GetAsync() {
            return await documentTypeRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<DocumentTypeBrowserStorageVM>> GetForBrowserStorageInvoiceAsync() {
            return await documentTypeRepo.GetForBrowserStorageAsync(1);
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<DocumentTypeBrowserStorageVM>> GetForBrowserStorageTransactionAsync() {
            return await documentTypeRepo.GetForBrowserStorageAsync(2);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await documentTypeRepo.GetByIdAsync(id);
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
        public ResponseWithBody Post([FromBody] DocumentTypeWriteDto DocumentType) {
            var x = documentTypeValidation.IsValid(null, DocumentType);
            if (x == 200) {
                var z = documentTypeRepo.Create(mapper.Map<DocumentTypeWriteDto, DocumentType>((DocumentTypeWriteDto)documentTypeRepo.AttachMetadataToPostDto(DocumentType)));
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Body = documentTypeRepo.GetByIdForBrowserStorageAsync(z.Id).Result,
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
        public async Task<ResponseWithBody> PutAsync([FromBody] DocumentTypeWriteDto documentType) {
            var x = await documentTypeRepo.GetByIdAsync(documentType.Id);
            if (x != null) {
                var z = documentTypeValidation.IsValid(x, documentType);
                if (z == 200) {
                    documentTypeRepo.Update(mapper.Map<DocumentTypeWriteDto, DocumentType>((DocumentTypeWriteDto)documentTypeRepo.AttachMetadataToPutDto(x, documentType)));
                    return new ResponseWithBody {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Body = documentTypeRepo.GetByIdForBrowserStorageAsync(documentType.Id).Result,
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
            var x = await documentTypeRepo.GetByIdAsync(id);
            if (x != null) {
                documentTypeRepo.Delete(x);
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

        [HttpPut("updateLastNo/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> UpdateLastNoAsync(int id) {
            var x = await documentTypeRepo.GetByIdAsync(id);
            if (x != null) {
                documentTypeRepo.UpdateLastNo(id);
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Body = documentTypeRepo.GetByIdForBrowserStorageAsync(id).Result,
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