using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Genders {

    public interface IGenderRepository : IRepository<Gender> {

        Task<IEnumerable<GenderListVM>> GetAsync();
        Task<IEnumerable<GenderAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Gender> GetByIdAsync(int id);

    }

}