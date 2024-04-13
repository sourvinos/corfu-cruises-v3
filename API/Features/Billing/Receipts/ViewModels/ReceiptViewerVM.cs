using System;

namespace API.Features.Billing.Receipts {

    public class ReceiptViewerVM {

        public Guid InvoiceId { get; set; }
        public ReceiptViewerHeaderVM Header { get; set; }
        public string Remarks { get; set; }
        public ReceiptViewerPartyVM Customer { get; set; }
        public ReceiptViewerDocumentTypeVM DocumentType { get; set; }
        public string PaymentMethod { get; set; }
        public ReceiptViewerPartyVM Issuer { get; set; }
        public decimal Amount { get; set; }
        public decimal PreviousBalance { get; set; }
        public decimal NewBalance { get; set; }

    }

}