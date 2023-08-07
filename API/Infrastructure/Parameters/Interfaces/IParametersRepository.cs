using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Infrastructure.Parameters {

    public interface IParametersRepository : IRepository<Parameter> {

        Task<Parameter> GetAsync();

    }

}