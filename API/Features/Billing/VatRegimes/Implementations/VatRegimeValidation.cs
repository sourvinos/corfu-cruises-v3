using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Features.Billing.VatRegimes {

    public class VatRegimeValidation : Repository<VatRegime>, IVatRegimeValidation {

        public VatRegimeValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(VatRegime z, VatRegimeWriteDto vatRegime) {
            return true switch {
                var x when x == IsAlreadyUpdated(z, vatRegime) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(VatRegime z, VatRegimeWriteDto vatRegime) {
            return z != null && z.PutAt != vatRegime.PutAt;
        }

    }

}