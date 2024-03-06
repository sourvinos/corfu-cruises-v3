using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Billing.Transactions {

    public class TransactionValidator : AbstractValidator<TransactionWriteDto> {

        public TransactionValidator() {
            // FKs
            RuleFor(x => x.CustomerId).NotEmpty();
            RuleFor(x => x.DocumentTypeId).NotEmpty();
            RuleFor(x => x.PaymentMethodId).NotEmpty();
            // Fields
            RuleFor(x => x.Date).Must(DateHelpers.BeCorrectFormat);
            RuleFor(x => x.InvoiceNo).NotEmpty();
            RuleFor(x => x.GrossAmount).InclusiveBetween(0, 99999);
            RuleFor(x => x.Remarks).MaximumLength(128);
        }

    }

}