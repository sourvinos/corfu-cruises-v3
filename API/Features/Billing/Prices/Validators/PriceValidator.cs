using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Prices {

    public class PriceValidator : AbstractValidator<PriceWriteDto> {

        public PriceValidator() {
            // FKs
            RuleFor(x => x.CustomerId).NotEmpty();
            RuleFor(x => x.DestinationId).NotEmpty();
            RuleFor(x => x.PortId).NotEmpty();
            // Fields
            RuleFor(x => x.From).Must(DateHelpers.BeCorrectFormat);
            RuleFor(x => x.To).Must(DateHelpers.BeCorrectFormat);
            RuleFor(x => x.AdultsWithTransfer).InclusiveBetween(1, 1000);
            RuleFor(x => x.AdultsWithoutTransfer).InclusiveBetween(1, 1000);
            RuleFor(x => x.KidsWithTransfer).InclusiveBetween(1, 1000);
            RuleFor(x => x.KidsWithoutTransfer).InclusiveBetween(1, 1000);
        }

    }

}