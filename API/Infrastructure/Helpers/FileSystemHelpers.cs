using System.IO;
using API.Features.Billing.Invoices;

namespace API.Infrastructure.Helpers {

    public static class FileSystemHelpers {

        public static string CreateInvoiceFullPathName(XmlInvoiceVM invoice, string prefix) {
            var date = invoice.InvoiceHeader.IssueDate.Replace("-", "");
            var aa = invoice.InvoiceHeader.Aa.PadLeft(5, '0');
            var series = invoice.InvoiceHeader.Series.PadLeft(5, '0');
            var extension = ".xml";
            var filename = string.Concat(prefix, "·", date, "·", aa, "·", series, extension);
            var fullpathname = Path.Combine("Reports" + Path.DirectorySeparatorChar, filename);
            return fullpathname;
        }

    }

}
