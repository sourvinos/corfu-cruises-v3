using System.Threading.Tasks;

namespace API.Features.Billing.Ledgers {

    public interface ILedgerEmailSender {

        Task SendLedgerToEmail(EmailLedgerVM model);

    }

}