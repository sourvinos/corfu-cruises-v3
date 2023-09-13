using API.Infrastructure.Interfaces;

namespace API.Features.Registrars {

    public interface IRegistrarValidation : IRepository<Registrar> {

        int IsValid(Registrar x, RegistrarWriteDto registrar);

    }

}