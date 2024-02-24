using FluentValidation;

namespace API.Features.Reservations.CrewSpecialties {

    public class CrewSpecialtyValidator : AbstractValidator<CrewSpecialtyWriteDto> {

        public CrewSpecialtyValidator() {
            // Fields
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}