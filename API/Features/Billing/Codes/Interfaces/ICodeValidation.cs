using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Codes {

    public interface ICodeValidation : IRepository<Code> {

        int IsValid(Code x, CodeWriteDto code);

    }

}