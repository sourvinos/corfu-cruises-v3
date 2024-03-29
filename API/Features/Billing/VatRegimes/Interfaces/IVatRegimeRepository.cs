using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.VatRegimes {

    public interface IVatRegimeRepository : IRepository<VatRegime> {

        Task<IEnumerable<VatRegimeListVM>> GetAsync();
        Task<IEnumerable<VatRegimeBrowserVM>> GetForBrowserAsync();
        Task<VatRegime> GetByIdAsync(string id);
 
    }

}