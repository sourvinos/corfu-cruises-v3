using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Codes {

    public interface ICodeRepository : IRepository<Code> {

        Task<IEnumerable<CodeListVM>> GetAsync();
        Task<IEnumerable<CodeAutoCompleteVM>> GetAutoCompleteAsync();
        Task<Code> GetByIdAsync(string id);
 
    }

}