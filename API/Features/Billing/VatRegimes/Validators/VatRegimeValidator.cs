using FluentValidation;

namespace API.Features.VatRegimes {

    public class VatRegimeValidator : AbstractValidator<VatRegimeWriteDto> {

        public VatRegimeValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}