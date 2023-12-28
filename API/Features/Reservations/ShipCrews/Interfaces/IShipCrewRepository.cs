using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.ShipCrews {

    public interface IShipCrewRepository : IRepository<ShipCrew> {

        Task<IEnumerable<ShipCrewListVM>> GetAsync();
        Task<IEnumerable<ShipCrewAutoCompleteVM>> GetAutoCompleteAsync();
        Task<ShipCrew> GetByIdAsync(int id, bool includeTables);

    }

}