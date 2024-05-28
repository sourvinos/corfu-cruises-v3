using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.RetailSales {

    public interface IRetailSaleXmlRepository {

        string CreateXMLFileAsync(XmlRetailSaleVM invoice);
        Task<string> UploadXMLAsync(XElement invoice, XmlCredentialsVM credentials);
        // Task<string> CancelInvoiceAsync(string mark, XmlCredentialsVM credentials);
        string SaveInvoiceResponse(XmlRetailSaleHeaderVM invoiceHeader, string subdirectory, string response);

    }

}