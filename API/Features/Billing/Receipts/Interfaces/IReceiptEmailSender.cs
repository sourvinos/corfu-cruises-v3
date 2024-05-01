using System.Threading.Tasks;

namespace API.Features.Billing.Receipts {

    public interface IReceiptEmailSender {

        Task SendReceiptToEmail(EmailReceiptVM model);

    }

}