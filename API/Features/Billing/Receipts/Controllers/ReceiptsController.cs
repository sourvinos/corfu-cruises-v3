﻿using System.Collections.Generic;
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
        private readonly IReceiptCalculateBalanceRepo receiptCalculateBalanceRepo;
        private readonly IReceiptRepository receiptRepo;
        private readonly IReceiptValidation receiptValidation;

        #endregion

        public ReceiptsController(IMapper mapper, IReceiptCalculateBalanceRepo receiptCalculateBalanceRepo, IReceiptRepository transactionRepo, IReceiptValidation transactionValidation) {
            this.mapper = mapper;
            this.receiptCalculateBalanceRepo = receiptCalculateBalanceRepo;
            this.receiptRepo = transactionRepo;
            this.receiptValidation = transactionValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ReceiptListVM>> GetAsync() {
            return await receiptRepo.GetAsync();
        }

        [HttpPost("{getForPeriod}")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ReceiptListVM>> GetForPeriodAsync([FromBody] ReceiptListCriteriaVM criteria) {
            return await receiptRepo.GetForPeriodAsync(criteria);
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
        public async Task<Response> PostAsync([FromBody] ReceiptWriteDto receipt) {
            var x = receiptValidation.IsValidAsync(null, receipt);
            if (await x == 200) {
                receipt = receiptCalculateBalanceRepo.AttachBalancesToCreateDto(receipt, receiptCalculateBalanceRepo.CalculateBalances(receipt, receipt.CustomerId));
                var z = receiptRepo.Create(mapper.Map<ReceiptWriteDto, Receipt>((ReceiptWriteDto)receiptRepo.AttachMetadataToPostDto(receipt)));
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
        public async Task<Response> PutAsync([FromBody] ReceiptWriteDto receipt) {
            var x = await receiptRepo.GetByIdAsync(receipt.InvoiceId.ToString(), false);
            if (x != null) {
                var z = receiptValidation.IsValidAsync(x, receipt);
                if (await z == 200) {
                    var i = receiptRepo.Update(mapper.Map<ReceiptWriteDto, Receipt>((ReceiptWriteDto)receiptRepo.AttachMetadataToPutDto(x, receipt)));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = i.InvoiceId.ToString(),
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