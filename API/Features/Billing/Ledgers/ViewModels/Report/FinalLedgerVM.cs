using System.Collections.Generic;

namespace API.Features.Billing.Ledgers {

    public class FinalLedgerVM {

        public PreviousPeriodLedgerVM PreviousPeriod { get; set; }
        public IList<LedgerVM> RequestedPeriod { get; set; }

    }

}