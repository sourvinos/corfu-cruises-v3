using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceRepository {

        void BuildXMLAsync(InvoiceVM invoice);
        void WriteXML(XElement invoice);
        Task<string> SendInvoiceAsync(XElement invoice);

    }

}