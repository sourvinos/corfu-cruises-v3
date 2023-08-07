using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Infrastructure.Parameters {

    public class ParametersRepository : Repository<Parameter>, IParametersRepository {

        public ParametersRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> boosettings) : base(appDbContext, httpContext, boosettings) { }

        public async Task<Parameter> GetAsync() {
            return await context.Parameters
                    .AsNoTracking()
                    .Include(x => x.User)
                    .SingleOrDefaultAsync();
        }

    }

}