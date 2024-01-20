using FluentValidation;

namespace API.Features.Reservations.Ships {

    public class ShipValidator : AbstractValidator<ShipWriteDto> {

        public ShipValidator() {
            // FKs
            RuleFor(x => x.ShipOwnerId).NotEmpty();
            // Fields
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Abbreviation).NotEmpty().MaximumLength(5);
            RuleFor(x => x.IMO).MaximumLength(128);
            RuleFor(x => x.Flag).MaximumLength(128);
            RuleFor(x => x.RegistryNo).MaximumLength(128);
            RuleFor(x => x.Manager).MaximumLength(128);
            RuleFor(x => x.ManagerInGreece).MaximumLength(128);
            RuleFor(x => x.Agent).MaximumLength(128);
        }

    }

}