using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Parameters {

    public interface IParameterValidation : IRepository<Parameter> {

        int IsValid(Parameter x, ParameterWriteDto parameter);

    }

}