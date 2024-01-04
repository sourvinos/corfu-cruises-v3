using FluentValidation;

namespace API.Features.PaymentMethods {

    public class PaymentMethodValidator : AbstractValidator<PaymentMethodWriteDto> {

        public PaymentMethodValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}