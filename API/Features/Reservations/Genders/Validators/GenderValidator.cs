using FluentValidation;

namespace API.Features.Reservations.Genders {

    public class GenderValidator : AbstractValidator<GenderWriteDto> {

        public GenderValidator() {
            // Fields
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}