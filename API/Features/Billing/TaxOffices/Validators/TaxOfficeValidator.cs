using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.TaxOffices {

    public class TaxOfficeValidator : AbstractValidator<TaxOfficeWriteDto> {

        public TaxOfficeValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}