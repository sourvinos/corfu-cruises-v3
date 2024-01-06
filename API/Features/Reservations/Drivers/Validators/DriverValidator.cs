using FluentValidation;

namespace API.Features.Reservations.Drivers{

    public class DriverValidator : AbstractValidator<DriverWriteDto> {

        public DriverValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Phones).MaximumLength(128);
        }

    }

}