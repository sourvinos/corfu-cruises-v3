using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Customers {

    public interface ICustomerRepository : IRepository<Customer> {

        Task<IEnumerable<CustomerListVM>> GetAsync();
        Task<IEnumerable<CustomerAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Customer> GetByIdAsync(int id);

    }

}