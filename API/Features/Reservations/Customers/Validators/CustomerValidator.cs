using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Customers {

    public class CustomerValidator : AbstractValidator<CustomerWriteDto> {

        public CustomerValidator() {
            RuleFor(x => x.NationalityId).NotEmpty();
            RuleFor(x => x.TaxOfficeId).NotEmpty();
            RuleFor(x => x.VatRegimeId).NotEmpty();
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.TaxNo).NotEmpty().MaximumLength(36);
            RuleFor(x => x.Profession).MaximumLength(128);
            RuleFor(x => x.Address).MaximumLength(128);
            RuleFor(x => x.Phones).MaximumLength(128);
            RuleFor(x => x.PersonInCharge).MaximumLength(128);
            RuleFor(x => x.Email).Must(EmailHelpers.BeEmptyOrValidEmailAddress).MaximumLength(128);
        }

    }

}