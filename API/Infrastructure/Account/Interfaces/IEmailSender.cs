using System.Threading.Tasks;
using API.Features.Billing.Ledgers;

namespace API.Infrastructure.Account {

    public interface IEmailSender {

        Task SendForgotPasswordEmail(string username, string displayname, string email, string callbackUrl, string subject);
        Task SendLedgerToEmail(EmailLedgerVM model);

    }

}