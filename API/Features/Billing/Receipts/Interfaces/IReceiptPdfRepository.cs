using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Receipts {

    public interface IReceiptPdfRepository {

        string BuildPdf(ReceiptPdfVM receipt);
        FileStreamResult OpenPdf(string filename);

    }

}