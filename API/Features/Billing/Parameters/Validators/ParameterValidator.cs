using FluentValidation;

namespace API.Features.Billing.Parameters {

    public class ParameterValidator : AbstractValidator<BillingParameter> {

        public ParameterValidator() {
            RuleFor(x => x.VatPercent).InclusiveBetween(0, 100);
            RuleFor(x => x.VatCategoryId).InclusiveBetween(1, 7);
        }

    }

}