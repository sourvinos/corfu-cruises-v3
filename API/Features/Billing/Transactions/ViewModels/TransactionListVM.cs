using API.Features.Billing.Invoices;
using API.Infrastructure.Classes;

namespace API.Features.Billing.Transactions {

    public class TransactionListVM {

        public string TransactionId { get; set; }
        public string Date { get; set; }
        public SimpleEntity Customer { get; set; }
        public DocumentTypeVM DocumentType { get; set; }
        public int InvoiceNo { get; set; }
        public decimal GrossAmount { get; set; }

    }

}