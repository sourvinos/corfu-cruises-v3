using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Destinations {

    public interface IDestinationRepository : IRepository<Destination> {

        Task<IEnumerable<DestinationListVM>> GetAsync();
        Task<IEnumerable<DestinationAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Destination> GetByIdAsync(int id);

    }

}