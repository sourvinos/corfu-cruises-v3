using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.PickupPoints {

    public interface IPickupPointRepository : IRepository<PickupPoint> {

        Task<IEnumerable<PickupPointListVM>> GetAsync();
        Task<IEnumerable<PickupPointAutoCompleteVM>> GetAutoCompleteAsync();
        Task<PickupPoint> GetByIdAsync(int id, bool includeTables);

    }

}