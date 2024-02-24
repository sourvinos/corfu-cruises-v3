using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.CrewSpecialties {

    public interface ICrewSpecialtyRepository : IRepository<CrewSpecialty> {

        Task<IEnumerable<CrewSpecialtyListVM>> GetAsync();
        Task<IEnumerable<CrewSpecialtyBrowserStorageVM>> GetBrowserStorageAsync();
        Task<CrewSpecialty> GetByIdAsync(int id);

    }

}