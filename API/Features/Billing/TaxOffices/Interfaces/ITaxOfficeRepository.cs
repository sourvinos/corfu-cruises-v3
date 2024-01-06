using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.TaxOffices {

    public interface ITaxOfficeRepository : IRepository<TaxOffice> {

        Task<IEnumerable<TaxOfficeListVM>> GetAsync();
        Task<IEnumerable<TaxOfficeAutoCompleteVM>> GetAutoCompleteAsync();
        Task<TaxOffice> GetByIdAsync(string id);
 
    }

}