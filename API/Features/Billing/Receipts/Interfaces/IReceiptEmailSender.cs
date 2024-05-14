using System.Threading.Tasks;

namespace API.Features.Billing.Receipts {

    public interface IReceiptEmailSender {

        Task SendReceiptsToEmail(EmailReceiptVM model);

    }

}