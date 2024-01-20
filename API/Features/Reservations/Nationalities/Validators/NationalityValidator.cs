using FluentValidation;

namespace API.Features.Reservations.Nationalities {

    public class NationalityValidator : AbstractValidator<NationalityWriteDto> {

        public NationalityValidator() {
            // Fields
            RuleFor(x => x.Code).NotEmpty().MaximumLength(10);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}