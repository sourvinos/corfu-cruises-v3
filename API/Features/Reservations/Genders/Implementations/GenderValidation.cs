using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Features.Reservations.Genders {

    public class GenderValidation : Repository<Gender>, IGenderValidation {

        public GenderValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(Gender z, GenderWriteDto gender) {
            return true switch {
                var x when x == IsAlreadyUpdated(z, gender) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(Gender z, GenderWriteDto gender) {
            return z != null && z.PutAt != gender.PutAt;
        }

    }

}