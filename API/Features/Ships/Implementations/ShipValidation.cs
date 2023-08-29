using System.Linq;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Ships {

    public class ShipValidation : Repository<Ship>, IShipValidation {

        public ShipValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(ShipWriteDto ship) {
            return true switch {
                var x when x == !IsValidShipOwner(ship) => 449,
                _ => 200,
            };
        }

        private bool IsValidShipOwner(ShipWriteDto ship) {
            return ship.Id == 0
                ? context.ShipOwners
                    .AsNoTracking()
                    .SingleOrDefault(x => x.Id == ship.ShipOwnerId && x.IsActive) != null
                : context.ShipOwners
                    .AsNoTracking()
                    .SingleOrDefault(x => x.Id == ship.ShipOwnerId) != null;
        }

    }

}