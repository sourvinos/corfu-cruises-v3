using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Parameters {

    public interface IParametersRepository : IRepository<Parameter> {

        Task<Parameter> GetAsync();

    }

}