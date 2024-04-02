using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceXmlRepository {

        string CreateXMLFileAsync(XmlInvoiceVM invoice);
        Task<string> UploadXMLAsync(XElement invoice, XmlCredentialsVM credentials);
        Task<string> CancelInvoiceAsync(XmlInvoiceCancelVM invoice);
        string SaveInvoiceResponse(XmlInvoiceHeaderVM invoiceHeader, string subdirectory, string response);

    }

}