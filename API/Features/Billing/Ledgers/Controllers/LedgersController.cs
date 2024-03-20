using System.Collections.Generic;
using System.Threading.Tasks;
using API.Features.Reservations.Customers;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Ledgers {

    [Route("api/[controller]")]
    public class LedgersBillingController : ControllerBase {

        #region variables

        private readonly ILedgerBillingRepository repo;
        private readonly ICustomerRepository customerRepo;

        #endregion

        public LedgersBillingController(ICustomerRepository customerRepo, ILedgerBillingRepository repo) {
            this.customerRepo = customerRepo;
            this.repo = repo;
        }

        [Authorize(Roles = "user, admin")]
        public List<LedgerVM> Post([FromBody] LedgerCriteria criteria) {
            var records = repo.BuildBalanceForLedger(repo.GetForLedger(criteria.FromDate, criteria.ToDate, criteria.CustomerId));
            var previous = repo.BuildPrevious(records, criteria.FromDate);
            var requested = repo.BuildRequested(records, criteria.FromDate);
            var total = repo.BuildTotal(records);
            return repo.MergePreviousRequestedAndTotal(previous, requested, total);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> Get(int id) {
            var x = await customerRepo.GetByIdAsync(id, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = new CustomerBalance {
                        Id = x.Id,
                        Description = x.Description,
                        Balance = repo.BuildBalance(await repo.GetForBalanceAsync(id))
                    }
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }

        }

    }

}