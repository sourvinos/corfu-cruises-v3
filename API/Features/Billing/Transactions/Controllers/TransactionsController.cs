using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Transactions {

    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly ITransactionRepository transactionRepo;
        private readonly ITransactionValidation transactionValidation;

        #endregion

        public TransactionsController(IMapper mapper, ITransactionRepository transactionRepo, ITransactionValidation transactionValidation) {
            this.mapper = mapper;
            this.transactionRepo = transactionRepo;
            this.transactionValidation = transactionValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<TransactionListVM>> GetAsync() {
            return await transactionRepo.GetAsync();
        }

        [HttpGet("{transactionId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string transactionId) {
            var x = await transactionRepo.GetByIdAsync(transactionId, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Transaction, TransactionReadDto>(x)
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
        public async Task<Response> PostAsync([FromBody] TransactionWriteDto transaction) {
            var x = transactionValidation.IsValidAsync(null, transaction);
            if (await x == 200) {
                var z = transactionRepo.Create(mapper.Map<TransactionWriteDto, Transaction>((TransactionWriteDto)transactionRepo.AttachMetadataToPostDto(transaction)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = z.TransactionId.ToString(),
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
        public async Task<Response> PutAsync([FromBody] TransactionWriteDto transaction) {
            var x = await transactionRepo.GetByIdAsync(transaction.TransactionId.ToString(), false);
            if (x != null) {
                var z = transactionValidation.IsValidAsync(x, transaction);
                if (await z == 200) {
                    transactionRepo.Update(mapper.Map<TransactionWriteDto, Transaction>((TransactionWriteDto)transactionRepo.AttachMetadataToPutDto(x, transaction)));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = x.TransactionId.ToString(),
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
            var x = await transactionRepo.GetByIdAsync(id, false);
            if (x != null) {
                transactionRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = x.TransactionId.ToString(),
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