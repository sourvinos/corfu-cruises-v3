using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Ledgers {

    [Route("api/[controller]")]
    public class LedgersBillingController : ControllerBase {

        #region variables

        private readonly ILedgerRepository repo;

        #endregion

        public LedgersBillingController(ILedgerRepository repo) {
            this.repo = repo;
        }

        [Authorize(Roles = "user, admin")]
        public IEnumerable<LedgerVM> Post([FromBody] LedgerCriteria criteria) {
            return repo.Get(criteria.FromDate, criteria.ToDate, criteria.CustomerIds);
        }

    }

}