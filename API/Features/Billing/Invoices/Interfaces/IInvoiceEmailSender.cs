using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceEmailSender {

        Task SendInvoiceToEmail(EmailInvoiceVM model);

    }

}