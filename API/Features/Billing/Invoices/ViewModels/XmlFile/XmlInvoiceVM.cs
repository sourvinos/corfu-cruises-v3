using System;

namespace API.Features.Billing.Invoices {

    public class XmlInvoiceVM {

        public Guid InvoiceId { get; set; }
        public XmlCredentialsVM Credentials { get; set; }
        public XmlIssuerVM Issuer { get; set; }
        public XmlCounterPartVM CounterPart { get; set; }
        public XmlInvoiceHeaderVM InvoiceHeader { get; set; }
        public XmlPaymentMethodVM PaymentMethod { get; set; }
        public XmlInvoiceRowVM InvoiceDetail { get; set; }
        public XmlInvoiceSummaryVM InvoiceSummary { get; set; }
        public XmlAadeVM Aade { get; set; }

    }

}