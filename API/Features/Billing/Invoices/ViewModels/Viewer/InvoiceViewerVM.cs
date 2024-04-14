using System;
using System.Collections.Generic;

namespace API.Features.Billing.Invoices {

    public class InvoiceViewerVM {

        public Guid InvoiceId { get; set; }
        public InvoiceViewerHeaderVM Header { get; set; }
        public string Remarks { get; set; }
        public InvoiceViewerShipVM Ship { get; set; }
        public InvoiceViewerAadeVM Aade { get; set; }
        public List<InvoiceViewerPortVM> Ports { get; set; }
        public InvoiceViewerPartyVM Customer { get; set; }
        public string Destination { get; set; }
        public InvoiceViewerDocumentTypeVM DocumentType { get; set; }
        public string PaymentMethod { get; set; }
        public InvoiceViewerPartyVM Issuer { get; set; }
        public InvoiceViewerSummaryVM Summary { get; set; }
        public decimal PreviousBalance { get; set; }
        public decimal NewBalance { get; set; }

    }

}