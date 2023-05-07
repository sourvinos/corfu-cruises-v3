using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Infrastructure.Settings {

    public class SettingsRepository : Repository<Setting>, ISettingsRepository {

        public SettingsRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> boosettings) : base(appDbContext, httpContext, boosettings) { }

        public async Task<Setting> GetAsync() {
            return await context.Settings
                    .AsNoTracking()
                    .SingleOrDefaultAsync();
        }

    }

}