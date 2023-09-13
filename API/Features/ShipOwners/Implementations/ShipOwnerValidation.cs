using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Features.ShipOwners {

    public class ShipOwnerValidation : Repository<ShipOwner>, IShipOwnerValidation {

        public ShipOwnerValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(ShipOwner z, ShipOwnerWriteDto shipOwner) {
            return true switch {
                var x when x == IsAlreadyUpdated(z, shipOwner) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(ShipOwner z, ShipOwnerWriteDto ship) {
            return z != null && z.PutAt != ship.PutAt;
        }

    }

}