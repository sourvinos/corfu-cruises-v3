using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Features.Reservations.CrewSpecialties {

    public class CrewSpecialtyValidation : Repository<CrewSpecialty>, ICrewSpecialtyValidation {

        public CrewSpecialtyValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(CrewSpecialty z, CrewSpecialtyWriteDto crewSpecialty) {
            return true switch {
                var x when x == IsAlreadyUpdated(z, crewSpecialty) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(CrewSpecialty z, CrewSpecialtyWriteDto crewSpecialty) {
            return z != null && z.PutAt != crewSpecialty.PutAt;
        }

    }

}