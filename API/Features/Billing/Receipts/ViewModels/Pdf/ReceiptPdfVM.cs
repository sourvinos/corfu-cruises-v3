using System;
using API.Infrastructure.Classes;

namespace API.Features.Billing.Receipts {

    public class ReceiptPdfVM {

        public Guid InvoiceId { get; set; }
        public InvoicePdfHeaderVM Header { get; set; }
        public string Remarks { get; set; }
        public InvoicePdfPartyVM Customer { get; set; }
        public InvoicePdfDocumentTypeVM DocumentType { get; set; }
        public string PaymentMethod { get; set; }
        public InvoicePdfPartyVM Issuer { get; set; }
        public InvoicePdfSummaryVM Summary { get; set; }
        public decimal PreviousBalance { get; set; }
        public decimal NewBalance { get; set; }
        public SimpleEntity[] BankAccounts { get; set; }

    }

}