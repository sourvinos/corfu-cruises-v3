using API.Infrastructure.Interfaces;

namespace API.Features.Customers {

    public interface ICustomerValidation : IRepository<Customer> {

        int IsValid(Customer x, CustomerWriteDto customer);

    }

}