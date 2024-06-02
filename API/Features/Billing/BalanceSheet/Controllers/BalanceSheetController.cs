using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.BalanceSheet {

    [Route("api/[controller]")]
    public class BalanceSheetController : ControllerBase {

        #region variables

        private readonly IBalanceSheetRepository repo;

        #endregion

        public BalanceSheetController(IBalanceSheetRepository repo) {
            this.repo = repo;
        }

        [HttpPost("buildBalanceSheet")]
        [Authorize(Roles = "admin")]
        public Task<BalanceSheetSummaryVM> BuildBalanceSheet([FromBody] BalanceSheetCriteria criteria) {
            return ProcessBalanceSheet(criteria);
        }

        private async Task<BalanceSheetSummaryVM> ProcessBalanceSheet(BalanceSheetCriteria criteria) {
            var records = repo.BuildBalanceForBalanceSheet(await repo.GetForBalanceSheet(criteria.FromDate, criteria.ToDate, criteria.CustomerId, criteria.ShipOwnerId));
            var previous = repo.BuildPrevious(records, criteria.FromDate);
            var requested = repo.BuildRequested(records, criteria.FromDate);
            var total = repo.BuildTotal(records);
            var merged = repo.MergePreviousRequestedAndTotal(previous, requested, total);
            var summary = repo.Summarize(merged);
            return summary;
        }

    }

}