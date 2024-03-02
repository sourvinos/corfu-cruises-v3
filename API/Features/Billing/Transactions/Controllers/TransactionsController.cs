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

    }

}