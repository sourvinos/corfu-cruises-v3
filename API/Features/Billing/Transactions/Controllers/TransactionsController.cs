using System.Collections.Generic;
using System.Threading.Tasks;
using API.Features.Billing.Invoices;
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

        [HttpGet("{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string invoiceId) {
            var x = await transactionRepo.GetByIdAsync(invoiceId, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Invoice, TransactionReadDto>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}