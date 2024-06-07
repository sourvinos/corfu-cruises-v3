using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.RetailSales {

    public interface IRetailSalePdfRepository {

        string BuildPdf(InvoicePdfVM invoice);
        string BuildMultiPagePdf(IEnumerable<InvoicePdfVM> invoices);
        FileStreamResult OpenPdf(string filename);

    }

}