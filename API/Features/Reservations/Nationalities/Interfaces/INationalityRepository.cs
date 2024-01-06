using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Nationalities {

    public interface INationalityRepository : IRepository<Nationality> {

        Task<IEnumerable<NationalityListVM>> GetAsync();
        Task<IEnumerable<NationalityAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Nationality> GetByIdAsync(int id);

    }

}