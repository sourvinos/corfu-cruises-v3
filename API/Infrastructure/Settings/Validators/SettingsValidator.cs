using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Infrastructure.Settings {

    public class SettingsValidator : AbstractValidator<Setting> {

        public SettingsValidator() {
            RuleFor(x => x.CompanyName).NotEmpty().MaximumLength(128);
            RuleFor(x => x.ClosingTime).Must(TimeHelpers.BeValidTime);
        }

    }

}