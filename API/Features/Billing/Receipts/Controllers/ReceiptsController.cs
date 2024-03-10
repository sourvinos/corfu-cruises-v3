using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Receipts {

    [Route("api/[controller]")]
    public class ReceiptsController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IReceiptRepository receiptRepo;
        private readonly IReceiptValidation receiptValidation;

        #endregion

        public ReceiptsController(IMapper mapper, IReceiptRepository transactionRepo, IReceiptValidation transactionValidation) {
            this.mapper = mapper;
            this.receiptRepo = transactionRepo;
            this.receiptValidation = transactionValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ReceiptListVM>> GetAsync() {
            return await receiptRepo.GetAsync();
        }

        [HttpGet("{transactionId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string transactionId) {
            var x = await receiptRepo.GetByIdAsync(transactionId, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Receipt, ReceiptReadDto>(x)
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
        public async Task<Response> PostAsync([FromBody] ReceiptWriteDto Receipt) {
            var x = receiptValidation.IsValidAsync(null, Receipt);
            if (await x == 200) {
                var z = receiptRepo.Create(mapper.Map<ReceiptWriteDto, Receipt>((ReceiptWriteDto)receiptRepo.AttachMetadataToPostDto(Receipt)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = z.InvoiceId.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = await x
                };
            }
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PutAsync([FromBody] ReceiptWriteDto Receipt) {
            var x = await receiptRepo.GetByIdAsync(Receipt.InvoiceId.ToString(), false);
            if (x != null) {
                var z = receiptValidation.IsValidAsync(x, Receipt);
                if (await z == 200) {
                    receiptRepo.Update(mapper.Map<ReceiptWriteDto, Receipt>((ReceiptWriteDto)receiptRepo.AttachMetadataToPutDto(x, Receipt)));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = x.InvoiceId.ToString(),
                        Message = ApiMessages.OK()
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = await z
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
            var x = await receiptRepo.GetByIdAsync(id, false);
            if (x != null) {
                receiptRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = x.InvoiceId.ToString(),
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