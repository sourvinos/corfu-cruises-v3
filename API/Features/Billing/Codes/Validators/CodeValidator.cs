using FluentValidation;

namespace API.Features.Codes {

    public class CodeValidator : AbstractValidator<CodeWriteDto> {

        public CodeValidator() {
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Batch).MaximumLength(5);
            RuleFor(x => x.Customers).MaximumLength(1);
            RuleFor(x => x.Suppliers).MaximumLength(1);
            RuleFor(x => x.Table8_1).MaximumLength(32);
            RuleFor(x => x.Table8_8).MaximumLength(32);
            RuleFor(x => x.Table8_9).MaximumLength(32);
        }

    }

}