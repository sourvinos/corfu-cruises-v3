using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Customers {

    public interface ICustomerRepository : IRepository<Customer> {

        Task<IEnumerable<CustomerListVM>> GetAsync();
        Task<IEnumerable<CustomerBrowserStorageVM>> GetForBrowserStorageAsync();
        Task<CustomerBrowserStorageVM> GetByIdForBrowserStorageAsync(int id);
        Task<Customer> GetByIdAsync(int id, bool includeTables);

    }

}