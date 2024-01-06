using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Ships {

    public interface IShipRepository : IRepository<Ship> {

        Task<IEnumerable<ShipListVM>> GetAsync();
        Task<IEnumerable<ShipAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Ship> GetByIdAsync(int id, bool includeTables);

    }

}