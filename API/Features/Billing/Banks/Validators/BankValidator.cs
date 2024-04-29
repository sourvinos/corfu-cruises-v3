using FluentValidation;

namespace API.Features.Billing.Banks {

    public class BankValidator : AbstractValidator<BankWriteDto> {

        public BankValidator() {
            // Fields
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}