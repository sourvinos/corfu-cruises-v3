using System.Collections.Generic;

namespace API.Features.Billing.Ledgers {

    public interface ILedgerRepository {

        IEnumerable<LedgerVM> Get(string fromDate, string toDate, int[] customerIds);

    }

}