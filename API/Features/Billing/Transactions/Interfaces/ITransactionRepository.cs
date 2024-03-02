using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Transactions {

    public interface ITransactionRepository : IRepository<Transaction> {

        Task<IEnumerable<TransactionListVM>> GetAsync();
        Task<Transaction> GetByIdAsync(string transactionId, bool includeTables);

    }

}