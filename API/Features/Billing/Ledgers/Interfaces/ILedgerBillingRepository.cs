using System.Collections.Generic;

namespace API.Features.Billing.Ledgers {

    public interface ILedgerBillingRepository {

        IEnumerable<LedgerVM> Get(string fromDate, string toDate, int customerId);
        IEnumerable<LedgerVM> BuildBalance(IEnumerable<LedgerVM> records);
        PreviousPeriodLedgerVM BuildPreviousBalance(IEnumerable<LedgerVM> records, string fromDate);
        List<LedgerVM> BuildRequestedPeriod(IEnumerable<LedgerVM> records, string fromDate);
        FinalLedgerVM MergePreviousAndRequestedPeriods(PreviousPeriodLedgerVM previousPeriod, List<LedgerVM> requestedPeriod);

    }

}