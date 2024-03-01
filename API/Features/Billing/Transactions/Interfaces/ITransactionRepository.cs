using System.Collections.Generic;
using System.Threading.Tasks;
using API.Features.Billing.Invoices;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Transactions {

    public interface ITransactionRepository : IRepository<Transaction> {

        Task<IEnumerable<TransactionListVM>> GetAsync();
        Task<Invoice> GetByIdAsync(string invoiceId, bool includeTables);

    }

}