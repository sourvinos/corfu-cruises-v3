using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.CoachRoutes {

    public interface ICoachRouteRepository : IRepository<CoachRoute> {

        Task<IEnumerable<CoachRouteListVM>> GetAsync();
        Task<IEnumerable<CoachRouteAutoCompleteVM>> GetAutoCompleteAsync();
        Task<CoachRoute> GetByIdAsync(int id, bool includeTables);

    }

}