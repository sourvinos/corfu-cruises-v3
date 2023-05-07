using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Infrastructure.Settings {

    public interface ISettingsRepository : IRepository<Setting> {

        Task<Setting> GetAsync();

    }

}