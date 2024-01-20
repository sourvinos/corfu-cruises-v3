using FluentValidation;

namespace API.Features.Billing.Parameters {

    public class ParameterValidator : AbstractValidator<BillingParameter> {

        public ParameterValidator() {
            // Fields
            RuleFor(x => x.AadeDemoUrl).MaximumLength(256);
            RuleFor(x => x.AadeDemoUsername).MaximumLength(256);
            RuleFor(x => x.AadeDemoApiKey).MaximumLength(256);
            RuleFor(x => x.AadeLiveUrl).MaximumLength(256);
            RuleFor(x => x.AadeLiveUsername).MaximumLength(256);
            RuleFor(x => x.AadeLiveApiKey).MaximumLength(256);
        }

    }

}