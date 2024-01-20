using FluentValidation;

namespace API.Features.Reservations.Ports {

    public class PortValidator : AbstractValidator<PortWriteDto> {

        public PortValidator() {
            // Fields
            RuleFor(x => x.Abbreviation).NotEmpty().MaximumLength(5);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.StopOrder).InclusiveBetween(1, to: 9);
        }

    }

}