using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Features.Billing.Codes {

    public class CodeValidation : Repository<Code>, ICodeValidation {

        public CodeValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(Code z, CodeWriteDto code) {
            return true switch {
                var x when x == IsAlreadyUpdated(z, code) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(Code z, CodeWriteDto code) {
            return z != null && z.PutAt != code.PutAt;
        }

    }

}