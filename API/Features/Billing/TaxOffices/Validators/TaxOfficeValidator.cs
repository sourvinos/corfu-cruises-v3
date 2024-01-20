using FluentValidation;

namespace API.Features.Billing.TaxOffices {

    public class TaxOfficeValidator : AbstractValidator<TaxOfficeWriteDto> {

        public TaxOfficeValidator() {
            // Fields
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}