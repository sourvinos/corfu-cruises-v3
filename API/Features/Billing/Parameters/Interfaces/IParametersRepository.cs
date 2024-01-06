using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Parameters {

    public interface IParametersRepository : IRepository<BillingParameter> {

        Task<BillingParameter> GetAsync();

    }

}