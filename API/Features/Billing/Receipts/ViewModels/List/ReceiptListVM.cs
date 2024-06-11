using API.Infrastructure.Classes;

namespace API.Features.Billing.Receipts {

    public class ReceiptListVM {

        public string InvoiceId { get; set; }
        public string Date { get; set; }
        public int InvoiceNo { get; set; }
        public SimpleEntity Customer { get; set; }
        public SimpleEntity DocumentType { get; set; }
        public SimpleEntity ShipOwner { get; set; }
        public SimpleEntity PaymentMethod { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        public bool IsEmailSent { get; set; }
        public bool IsCancelled { get; set; }

    }

}