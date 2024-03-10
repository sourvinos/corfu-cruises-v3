using API.Features.Billing.Invoices;
using API.Infrastructure.Classes;

namespace API.Features.Billing.Receipts {

    public class ReceiptListVM {

        public string InvoiceId { get; set; }
        public string Date { get; set; }
        public SimpleEntity Customer { get; set; }
        public DocumentTypeVM DocumentType { get; set; }
        public int InvoiceNo { get; set; }
        public decimal GrossAmount { get; set; }

    }

}