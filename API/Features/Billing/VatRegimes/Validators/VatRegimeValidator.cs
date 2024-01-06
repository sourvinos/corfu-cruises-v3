using FluentValidation;

namespace API.Features.Billing.VatRegimes {

    public class VatRegimeValidator : AbstractValidator<VatRegimeWriteDto> {

        public VatRegimeValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}