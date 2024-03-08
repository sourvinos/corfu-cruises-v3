using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceAadeRepository {

        string CreateXMLAsync(InvoiceVM invoice);
        Task<string> UploadXMLAsync(XElement invoice, CredentialsVM credentials);
        string SaveResponse(InvoiceVM invoice, string response);

    }

}