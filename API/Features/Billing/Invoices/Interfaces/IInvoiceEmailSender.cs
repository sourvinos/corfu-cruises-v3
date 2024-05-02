using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceEmailSender {

        Task SendInvoicesToEmail(EmailInvoicesVM model);

    }

}