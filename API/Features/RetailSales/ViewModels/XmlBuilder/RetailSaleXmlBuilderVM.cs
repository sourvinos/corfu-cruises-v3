using System;

namespace API.Features.RetailSales {

    public class RetailSaleXmlBuilderVM {

        public Guid ReservationId { get; set; }
        public XmlCredentialsVM Credentials { get; set; }
        public XmlPartyVM Issuer { get; set; }
        public XmlPartyVM CounterPart { get; set; }
        public XmlRetailSaleHeaderVM InvoiceHeader { get; set; }
        public XmlPaymentMethodVM PaymentMethod { get; set; }
        public XmlRetailSaleRowVM InvoiceDetail { get; set; }
        public XmlRetailSaleSummaryVM InvoiceSummary { get; set; }
        public XmlAadeVM Aade { get; set; }

    }

}