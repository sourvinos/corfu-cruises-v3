using System.Threading.Tasks;

namespace API.Features.Billing.Receipts {

    public interface IReceiptValidation {

        Task<int> IsValidAsync(Receipt x, ReceiptWriteDto transaction);

    }

}