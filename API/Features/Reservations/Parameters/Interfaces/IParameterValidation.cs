using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Parameters {

    public interface IParameterValidation : IRepository<ReservationParameter> {

        int IsValid(ReservationParameter x, ParameterWriteDto parameter);

    }

}