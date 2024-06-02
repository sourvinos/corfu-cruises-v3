using API.Infrastructure.Classes;

namespace API.Features.Billing.BalanceSheet {

    public class BalanceSheetVM {

        public string Date { get; set; }
        public SimpleEntity ShipOwner { get; set; }
        public SimpleEntity Customer { get; set; }
        public DocumentTypeVM DocumentType { get; set; }
        public string InvoiceNo { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public decimal Balance { get; set; }

    }

}