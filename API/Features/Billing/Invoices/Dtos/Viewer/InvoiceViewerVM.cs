using System;
using System.Collections.Generic;

namespace API.Features.Billing.Invoices {

    public class InvoiceViewerVM {

        public Guid InvoiceId { get; set; }
        public string Date { get; set; }
        public int InvoiceNo { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        public string Ship { get; set; }
        public InvoiceViewerAadeVM Aade { get; set; }
        public List<InvoiceViewerPortVM> InvoicesPorts { get; set; }
        public InvoiceViewerPartyVM Customer { get; set; }
        public string Destination { get; set; }
        public InvoiceViewerDocumentTypeVM DocumentType { get; set; }
        public string PaymentMethod { get; set; }
        public InvoiceViewerPartyVM Issuer { get; set; }

    }

}