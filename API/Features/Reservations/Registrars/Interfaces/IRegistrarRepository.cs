using API.Infrastructure.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Features.Reservations.Registrars {

    public interface IRegistrarRepository : IRepository<Registrar> {

        Task<IEnumerable<RegistrarListVM>> GetAsync();
        Task<IEnumerable<RegistrarAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Registrar> GetByIdAsync(int id, bool includeTables);
        Task<bool> ValidateForManifest(int shipId);

    }

}