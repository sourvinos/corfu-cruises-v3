using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Features.Billing.Ledgers {

    public interface ILedgerBillingRepository {

        IEnumerable<LedgerVM> GetForLedger(string fromDate, string toDate, int customerId);
        IEnumerable<LedgerVM> BuildBalanceForLedger(IEnumerable<LedgerVM> records);
        LedgerVM BuildPrevious(IEnumerable<LedgerVM> records, string fromDate);
        List<LedgerVM> BuildRequested(IEnumerable<LedgerVM> records, string fromDate);
        LedgerVM BuildTotal(IEnumerable<LedgerVM> records);
        List<LedgerVM> MergePreviousRequestedAndTotal(LedgerVM previousPeriod, List<LedgerVM> requestedPeriod, LedgerVM total);
        Task<IEnumerable<LedgerVM>> GetForBalanceAsync(int customerId);
        decimal BuildBalance(IEnumerable<LedgerVM> records);

    }

}