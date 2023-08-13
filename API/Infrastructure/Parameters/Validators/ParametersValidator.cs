using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Infrastructure.Parameters {

    public class ParametersValidator : AbstractValidator<Parameter> {

        public ParametersValidator() {
            RuleFor(x => x.ClosingTime).Must(TimeHelpers.BeValidTime);
            RuleFor(x => x.Phones).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Email).Must(EmailHelpers.BeValidEmailAddress).MaximumLength(128);
        }

    }

}