using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Registrars
{

    public interface IRegistrarRepository : IRepository<Registrar>
    {

        Task<IEnumerable<RegistrarListVM>> GetAsync();
        Task<IEnumerable<RegistrarAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Registrar> GetByIdAsync(int id, bool includeTables);
        Task<bool> IsPairValid(int shipId);

    }

}