using API.Infrastructure.Classes;

namespace API.Features.Billing.Ledgers {

    public class LedgerVM {

        public SimpleEntity Customer { get; set; }
        decimal Debit { get; set; }
        decimal Credit { get; set; }
        decimal Balance { get; set; }

    }

}