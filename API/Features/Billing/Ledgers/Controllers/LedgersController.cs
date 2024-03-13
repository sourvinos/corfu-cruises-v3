using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Ledgers {

    [Route("api/[controller]")]
    public class LedgersBillingController : ControllerBase {

        private readonly ILedgerBillingRepository repo;

        public LedgersBillingController(ILedgerBillingRepository repo) {
            this.repo = repo;
        }

        [Authorize(Roles = "user, admin")]
        public List<LedgerVM> Post([FromBody] LedgerCriteria criteria) {
            var records = repo.BuildBalance(repo.Get(criteria.FromDate, criteria.ToDate, criteria.CustomerId));
            var previous = repo.BuildPrevious(records, criteria.FromDate);
            var requested = repo.BuildRequested(records, criteria.FromDate);
            var total = repo.BuildTotal(records);
            return repo.MergePreviousRequestedAndTotal(previous, requested, total);
        }

    }

}