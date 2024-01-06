using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Registrars {

    public interface IRegistrarValidation : IRepository<Registrar> {

        int IsValid(Registrar x, RegistrarWriteDto registrar);

    }

}