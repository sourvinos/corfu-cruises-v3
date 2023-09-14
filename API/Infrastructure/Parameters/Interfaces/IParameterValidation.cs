using API.Infrastructure.Interfaces;

namespace API.Infrastructure.Parameters {

    public interface IParameterValidation : IRepository<Parameter> {

        int IsValid(Parameter x, ParameterWriteDto parameter);

    }

}