using System;

namespace API.Features.Billing.Invoices {

    public class XmlInvoiceVM {

        public Guid InvoiceId { get; set; }
        public XmlCredentialsVM Credentials { get; set; }
        public XmlPartyVM Issuer { get; set; }
        public XmlPartyVM CounterPart { get; set; }
        public XmlInvoiceHeaderVM InvoiceHeader { get; set; }
        public XmlPaymentMethodVM[] PaymentMethods { get; set; }
        public XmlInvoiceRowVM[] InvoiceDetails { get; set; }
        public XmlInvoiceSummaryVM InvoiceSummary { get; set; }

    }

}