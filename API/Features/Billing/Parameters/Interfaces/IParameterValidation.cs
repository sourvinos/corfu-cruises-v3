using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Parameters {

    public interface IBillingParameterValidation : IRepository<BillingParameter> {

        int IsValid(BillingParameter x, ParameterWriteDto parameter);

    }

}