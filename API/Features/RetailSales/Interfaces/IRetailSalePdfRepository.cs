using Microsoft.AspNetCore.Mvc;

namespace API.Features.RetailSales {

    public interface IRetailSalePdfRepository {

        string BuildPdf(InvoicePdfVM invoice);
        FileStreamResult OpenPdf(string filename);

    }

}