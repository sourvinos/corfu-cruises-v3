using FluentValidation;

namespace API.Features.Codes {

    public class CodeValidator : AbstractValidator<CodeWriteDto> {

        public CodeValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}