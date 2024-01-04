using API.Infrastructure.Interfaces;

namespace API.Features.Codes {

    public interface ICodeValidation : IRepository<Code> {

        int IsValid(Code x, CodeWriteDto code);

    }

}