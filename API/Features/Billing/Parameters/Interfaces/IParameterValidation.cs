using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Parameters {

    public interface IParameterValidation : IRepository<BillingParameter> {

        int IsValid(BillingParameter x, ParameterWriteDto parameter);

    }

}