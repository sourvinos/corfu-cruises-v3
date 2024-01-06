using FluentValidation;

namespace API.Features.Reservations.Nationalities {

    public class NationalityValidator : AbstractValidator<NationalityWriteDto> {

        public NationalityValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Code).NotEmpty().MaximumLength(10);
        }

    }

}