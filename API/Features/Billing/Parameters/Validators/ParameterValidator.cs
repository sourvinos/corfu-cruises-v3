using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Billing.Parameters {

    public class ParameterValidator : AbstractValidator<BillingParameter> {

        public ParameterValidator() {
            RuleFor(x => x.ClosingTime).Must(TimeHelpers.BeValidTime);
            RuleFor(x => x.Phones).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Email).Must(EmailHelpers.BeValidEmailAddress).MaximumLength(128);
        }

    }

}