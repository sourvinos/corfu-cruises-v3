namespace API.Features.Billing.Invoices {

    public interface IInvoicePdfRepository {

        string BuildPdf(InvoicePdfVM invoice);

    }

}