using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Reservations.Customers {

    public class CustomerValidator : AbstractValidator<CustomerWriteDto> {

        public CustomerValidator() {
            // FKs
            RuleFor(x => x.NationalityId).NotEmpty();
            RuleFor(x => x.TaxOfficeId).NotEmpty();
            RuleFor(x => x.VatRegimeId).NotEmpty();
            // Fields
            RuleFor(x => x.Abbreviation).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(512);
            RuleFor(x => x.VatNumber).NotEmpty().MaximumLength(36);
            RuleFor(x => x.Branch).InclusiveBetween(0, 10);
            RuleFor(x => x.Profession).MaximumLength(128);
            RuleFor(x => x.Address).NotEmpty().MaximumLength(128);
            RuleFor(x => x.PostalCode).NotEmpty().MaximumLength(10);
            RuleFor(x => x.City).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Phones).MaximumLength(128);
            RuleFor(x => x.PersonInCharge).MaximumLength(128);
            RuleFor(x => x.Email).Must(EmailHelpers.BeEmptyOrValidEmailAddress).MaximumLength(128);
            RuleFor(x => x.BalanceLimit).InclusiveBetween(0, 99999);
        }

    }

}