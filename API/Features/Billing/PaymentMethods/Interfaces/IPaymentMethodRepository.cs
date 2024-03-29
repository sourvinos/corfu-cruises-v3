using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.PaymentMethods {

    public interface IPaymentMethodRepository : IRepository<PaymentMethod> {

        Task<IEnumerable<PaymentMethodListVM>> GetAsync();
        Task<IEnumerable<PaymentMethodBrowserVM>> GetForBrowserAsync();
        Task<PaymentMethod> GetByIdAsync(string id);
 
    }

}