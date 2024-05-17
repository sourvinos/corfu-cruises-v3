using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwnerValidator : AbstractValidator<ShipOwnerWriteDto> {

        public ShipOwnerValidator() {
            // FKs
            RuleFor(x => x.NationalityId).NotEmpty();
            RuleFor(x => x.TaxOfficeId).NotEmpty();
            RuleFor(x => x.VatRegimeId).NotEmpty();
            // Fields
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.DescriptionInEnglish).NotEmpty().MaximumLength(128);
            RuleFor(x => x.VatNumber).NotEmpty().MaximumLength(36);
            RuleFor(x => x.VatMyDataId).InclusiveBetween(1, 8);
            RuleFor(x => x.VatPercent).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Branch).InclusiveBetween(0, 10);
            RuleFor(x => x.Profession).MaximumLength(128);
            RuleFor(x => x.Street).MaximumLength(128);
            RuleFor(x => x.Number).MaximumLength(4);
            RuleFor(x => x.PostalCode).NotEmpty().MaximumLength(10);
            RuleFor(x => x.City).NotEmpty().MaximumLength(128);
            RuleFor(x => x.PersonInCharge).MaximumLength(128);
            RuleFor(x => x.Phones).MaximumLength(128);
            RuleFor(x => x.Email).Must(EmailHelpers.BeEmptyOrValidEmailAddress).MaximumLength(128);
            RuleFor(x => x.DemoUrl).MaximumLength(256);
            RuleFor(x => x.DemoUsername).MaximumLength(256);
            RuleFor(x => x.DemoSubscriptionKey).MaximumLength(256);
            RuleFor(x => x.LiveUrl).MaximumLength(256);
            RuleFor(x => x.LiveUsername).MaximumLength(256);
            RuleFor(x => x.LiveSubscriptionKey).MaximumLength(256);
        }

    }

}