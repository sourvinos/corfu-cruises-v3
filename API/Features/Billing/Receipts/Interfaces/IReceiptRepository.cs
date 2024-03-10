using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Receipts {

    public interface IReceiptRepository : IRepository<Receipt> {

        Task<IEnumerable<ReceiptListVM>> GetAsync();
        Task<Receipt> GetByIdAsync(string transactionId, bool includeTables);

    }

}