using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Invoices {

    public interface IInvoicePdfRepository {

        string BuildPdf(InvoicePdfVM invoice);
        FileStreamResult OpenPdf(string filename);

    }

}