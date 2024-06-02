using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Features.Billing.BalanceSheet {

    public interface IBalanceSheetRepository {

        Task<IEnumerable<BalanceSheetVM>> GetForBalanceSheet(string fromDate, string toDate, int customerId, int? shipOwnerId);
        IEnumerable<BalanceSheetVM> BuildBalanceForBalanceSheet(IEnumerable<BalanceSheetVM> records);
        BalanceSheetVM BuildPrevious(IEnumerable<BalanceSheetVM> records, string fromDate);
        List<BalanceSheetVM> BuildRequested(IEnumerable<BalanceSheetVM> records, string fromDate);
        BalanceSheetVM BuildTotal(IEnumerable<BalanceSheetVM> records);
        List<BalanceSheetVM> MergePreviousRequestedAndTotal(BalanceSheetVM previousPeriod, List<BalanceSheetVM> requestedPeriod, BalanceSheetVM total);
        Task<IEnumerable<BalanceSheetVM>> GetForBalanceAsync(int customerId);
        BalanceSheetSummaryVM Summarize(IEnumerable<BalanceSheetVM> ledger);
    }

}