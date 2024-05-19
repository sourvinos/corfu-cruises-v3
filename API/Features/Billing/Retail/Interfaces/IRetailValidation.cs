using System.Threading.Tasks;

namespace API.Features.Billing.Retail {

    public interface IRetailValidation {

        Task<int> IsValidAsync(Retail x, RetailWriteDto retail);

    }

}