using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Features.Reservations.ShipRoutes {

    public class ShipRouteValidation : Repository<ShipRoute>, IShipRouteValidation {

        public ShipRouteValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(ShipRoute z, ShipRouteWriteDto shipRoute) {
            return true switch {
                var x when x == IsAlreadyUpdated(z, shipRoute) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(ShipRoute z, ShipRouteWriteDto ship) {
            return z != null && z.PutAt != ship.PutAt;
        }

    }

}