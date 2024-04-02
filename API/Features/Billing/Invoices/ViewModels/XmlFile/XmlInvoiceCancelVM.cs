namespace API.Features.Billing.Invoices {

    public class XmlInvoiceCancelVM {

        public XmlCredentialsVM Credentials { get; set; }
        public XmlInvoiceHeaderVM InvoiceHeader { get; set; }
        public string Mark { get; set; }

    }

}