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
        public FinalLedgerVM Post([FromBody] LedgerCriteria criteria) {
            var records = repo.Get(criteria.FromDate, criteria.ToDate, criteria.CustomerId);
            records = repo.BuildBalance(records);
            var previousPeriod = repo.BuildPreviousBalance(records, criteria.FromDate);
            var requestedPeriod = repo.BuildRequestedPeriod(records, criteria.FromDate);
            return repo.MergePreviousAndRequestedPeriods(previousPeriod, requestedPeriod);
        }

    }

}