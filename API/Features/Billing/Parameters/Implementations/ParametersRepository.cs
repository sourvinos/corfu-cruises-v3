using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Billing.Parameters {

    public class ParametersRepository : Repository<BillingParameter>, IParametersRepository {

        public ParametersRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> boosettings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, boosettings, userManager) { }

        public async Task<BillingParameter> GetAsync() {
            return await context.BillingParameters
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }

    }

}