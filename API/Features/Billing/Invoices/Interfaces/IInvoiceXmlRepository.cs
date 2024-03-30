using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceXmlRepository {

        string CreateXMLFileAsync(XmlInvoiceVM invoice);
        Task<string> UploadXMLAsync(XElement invoice, XmlCredentialsVM credentials);
        string SaveResponse(XmlInvoiceVM invoice, string response);

    }

}