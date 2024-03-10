using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceRepository : IRepository<Invoice> {

        Task<IEnumerable<InvoiceListVM>> GetAsync();
        Task<Invoice> GetByIdAsync(string transactionId, bool includeTables);

    }

}