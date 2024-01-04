using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.PaymentMethods {

    public interface IPaymentMethodRepository : IRepository<PaymentMethod> {

        Task<IEnumerable<PaymentMethodListVM>> GetAsync();
        Task<IEnumerable<PaymentMethodAutoCompleteVM>> GetAutoCompleteAsync();
        Task<PaymentMethod> GetByIdAsync(string id);
 
    }

}