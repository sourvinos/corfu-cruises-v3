using System;
using System.Collections.Generic;
using API.Infrastructure.Classes;

namespace API.Features.Billing.Invoices {

    public class InvoiceViewerVM {

        // PK
        public Guid InvoiceId { get; set; }
        // Fields
        public string Date { get; set; }
        public int InvoiceNo { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        // Child tables
        public InvoiceViewerAadeVM Aade { get; set; }
        public List<InvoiceViewerPortVM> InvoicesPorts { get; set; }
        // Navigation
        public InvoiceViewerPartyVM Customer { get; set; }
        public SimpleEntity Destination { get; set; }
        public InvoiceViewerDocumentTypeVM DocumentType { get; set; }
        public SimpleEntity PaymentMethod { get; set; }
        public InvoiceViewerPartyVM Issuer { get; set; }

    }

}