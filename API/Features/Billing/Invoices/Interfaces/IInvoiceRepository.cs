namespace API.Features.Billing.Invoices {

    public interface IInvoiceRepository {

        void BuildInvoiceXML(InvoiceVM invoice);

    }

}