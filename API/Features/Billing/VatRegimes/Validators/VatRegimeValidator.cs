using FluentValidation;

namespace API.Features.Billing.VatRegimes {

    public class VatRegimeValidator : AbstractValidator<VatRegimeWriteDto> {

        public VatRegimeValidator() {
            // Fields
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}