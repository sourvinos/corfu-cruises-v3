using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceRepository {

        XElement BuildInvoice(InvoiceVM invoice);
        Task<string> SendInvoiceAsync(XElement invoice);

    }

}