using System.Collections.Generic;

namespace API.Features.Billing.Ledgers {

    public interface ILedgerBillingRepository {

        IEnumerable<LedgerVM> Get(string fromDate, string toDate, int customerId);
        IEnumerable<LedgerVM> BuildBalance(IEnumerable<LedgerVM> records);
        LedgerVM BuildPrevious(IEnumerable<LedgerVM> records, string fromDate);
        List<LedgerVM> BuildRequested(IEnumerable<LedgerVM> records, string fromDate);
        LedgerVM BuildTotal(IEnumerable<LedgerVM> records);
        List<LedgerVM> MergePreviousRequestedAndTotal(LedgerVM previousPeriod, List<LedgerVM> requestedPeriod, LedgerVM total);

    }

}