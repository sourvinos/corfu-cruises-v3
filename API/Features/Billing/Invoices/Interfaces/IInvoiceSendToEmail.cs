using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceSendToEmail {

        Task SendInvoiceLinkToEmail(InvoiceLinkVM invoiceLink, string returnUrl);

    }

}