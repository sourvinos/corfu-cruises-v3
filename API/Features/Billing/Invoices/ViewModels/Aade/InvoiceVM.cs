using System;

namespace API.Features.Billing.Invoices {

    public class InvoiceVM {

        public Guid InvoiceId { get; set; }
        public PartyVM Issuer { get; set; }
        public PartyVM CounterPart { get; set; }
        public InvoiceHeaderVM InvoiceHeader { get; set; }
        public PaymentMethodVM[] PaymentMethods { get; set; }
        public InvoiceRowVM[] InvoiceDetails { get; set; }
        public InvoiceSummaryVM InvoiceSummary { get; set; }

    }

}