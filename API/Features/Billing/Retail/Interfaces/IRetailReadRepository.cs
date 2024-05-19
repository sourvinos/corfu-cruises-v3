using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Retail {

    public interface IRetailReadRepository : IRepository<Retail> {

        Task<IEnumerable<RetailListVM>> GetAsync();
        Task<IEnumerable<RetailListVM>> GetForPeriodAsync(RetailListCriteriaVM criteria);
        Task<Retail> GetByIdAsync(string invoiceId, bool includeTables);
        Task<RetailAade> GetInvoiceAadeByIdAsync(string invoiceId);

    }

}