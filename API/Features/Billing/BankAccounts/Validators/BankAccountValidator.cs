using FluentValidation;

namespace API.Features.Billing.BankAccounts {

    public class BankAccountValidator : AbstractValidator<BankAccountWriteDto> {

        public BankAccountValidator() {
            // FKs
            RuleFor(x => x.BankId).NotEmpty();
            RuleFor(x => x.ShipOwnerId).NotEmpty();
            // Fields
            RuleFor(x => x.Iban).NotEmpty().MaximumLength(128);
        }

    }

}