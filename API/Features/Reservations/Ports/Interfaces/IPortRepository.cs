using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Ports {

    public interface IPortRepository : IRepository<Port> {

        Task<IEnumerable<PortListVM>> GetAsync();
        Task<IEnumerable<PortAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Port> GetByIdAsync(int id);

    }

}