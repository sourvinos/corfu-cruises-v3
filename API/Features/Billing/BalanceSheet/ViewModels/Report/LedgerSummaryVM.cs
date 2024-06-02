using API.Infrastructure.Classes;

namespace API.Features.Billing.BalanceSheet {

    public class LedgerSummaryVM {

        public SimpleEntity ShipOwner { get; set; }
        public SimpleEntity Customer { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public decimal Balance { get; set; }

    }

}