using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeValidator : AbstractValidator<DocumentTypeWriteDto> {

        public DocumentTypeValidator() {
            // FKs
            RuleFor(x => x.CompanyId).NotEmpty();
            // Fields
            RuleFor(x => x.Abbreviation).NotEmpty().MaximumLength(5);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Batch).NotNull().MaximumLength(5);
            RuleFor(x => x.LastDate).Must(DateHelpers.BeCorrectFormat);
            RuleFor(x => x.LastNo).NotNull().InclusiveBetween(0, 9999);
            RuleFor(x => x.DiscriminatorId).NotNull().InclusiveBetween(1, 2);
            RuleFor(x => x.Customers).NotNull().MaximumLength(1).Matches(@"^[+|\-| ]*$");
            RuleFor(x => x.Suppliers).NotNull().MaximumLength(1).Matches(@"^[+|\-| ]*$");
            RuleFor(x => x.Table8_1).NotNull().MaximumLength(32);
            RuleFor(x => x.Table8_8).NotNull().MaximumLength(32);
            RuleFor(x => x.Table8_9).NotNull().MaximumLength(32);
        }

    }

}