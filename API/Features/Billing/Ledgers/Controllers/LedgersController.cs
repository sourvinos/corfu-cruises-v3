using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Ledgers {

    [Route("api/[controller]")]
    public class LedgersBillingController : ControllerBase {

        #region variables

        private readonly ILedgerBillingRepository repo;

        #endregion

        public LedgersBillingController(ILedgerBillingRepository repo) {
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

    }

}