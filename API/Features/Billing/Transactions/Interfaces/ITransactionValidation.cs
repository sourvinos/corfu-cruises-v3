using System.Threading.Tasks;

namespace API.Features.Billing.Transactions {

    public interface ITransactionValidation {

        Task<int> IsValidAsync(Transaction x, TransactionWriteDto invoice);

    }

}