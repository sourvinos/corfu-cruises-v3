using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Prices {

    public interface IPriceRepository : IRepository<Price> {

        Task<IEnumerable<PriceListVM>> GetAsync();
        Task<Price> GetByIdAsync(string id, bool includeTables);
        void DeleteRange(string[] ids);

    }

}