using System.Linq;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.CoachRoutes {

    public class CoachRouteValidation : Repository<CoachRoute>, ICoachRouteValidation {

        public CoachRouteValidation(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(context, httpContext, settings, userManager) { }

        public int IsValid(CoachRoute z, CoachRouteWriteDto coachRoute) {
            return true switch {
                var x when x == !IsValidPort(coachRoute) => 450,
                var x when x == IsAlreadyUpdated(z, coachRoute) => 415,
                _ => 200,
            };
        }

        private bool IsValidPort(CoachRouteWriteDto coachRoute) {
            return coachRoute.Id == 0
                ? context.Ports
                    .AsNoTracking()
                    .SingleOrDefault(x => x.Id == coachRoute.PortId && x.IsActive) != null
                : context.Ports
                    .AsNoTracking()
                    .SingleOrDefault(x => x.Id == coachRoute.PortId) != null;
        }

        private static bool IsAlreadyUpdated(CoachRoute z, CoachRouteWriteDto coachRoute) {
            return z != null && z.PutAt != coachRoute.PutAt;
        }

    }

}