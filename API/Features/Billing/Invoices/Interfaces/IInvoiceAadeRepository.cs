using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceAadeRepository {

        void CreateXMLAsync(InvoiceVM invoice);
        Task<string> UploadXMLAsync(XElement invoice);

    }

}