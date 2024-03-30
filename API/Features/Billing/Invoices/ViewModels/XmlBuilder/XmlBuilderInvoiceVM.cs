using System;

namespace API.Features.Billing.Invoices {

    public class XmlBuilderInvoiceVM {

        public Guid InvoiceId { get; set; }
        public XmlCredentialsVM Credentials { get; set; }
        public XmlPartyVM Issuer { get; set; }
        public XmlPartyVM CounterPart { get; set; }
        public XmlInvoiceHeaderVM InvoiceHeader { get; set; }

    }

}