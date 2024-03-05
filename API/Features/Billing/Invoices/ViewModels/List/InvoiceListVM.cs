using API.Infrastructure.Classes;

namespace API.Features.Billing.Invoices {

    public class InvoiceListVM {

        public string InvoiceId { get; set; }
        public string Date { get; set; }
        public int InvoiceNo { get; set; }
        public SimpleEntity Customer { get; set; }
        public SimpleEntity Destination { get; set; }
        public DocumentTypeVM DocumentType { get; set; }
        public SimpleEntity Ship { get; set; }
        public decimal GrossAmount { get; set; }

    }

}