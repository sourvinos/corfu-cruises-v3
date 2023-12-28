using System.Linq;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Registrars {

    public class RegistrarValidation : Repository<Registrar>, IRegistrarValidation {

        public RegistrarValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(Registrar z, RegistrarWriteDto registrar) {
            return true switch {
                var x when x == !IsValidShip(registrar) => 454,
                var x when x == IsAlreadyUpdated(z, registrar) => 415,
                _ => 200,
            };
        }

        private bool IsValidShip(RegistrarWriteDto registrar) {
            return registrar.Id == 0
                ? context.Ships
                    .AsNoTracking()
                    .SingleOrDefault(x => x.Id == registrar.ShipId && x.IsActive) != null
                : context.Ships
                    .AsNoTracking()
                    .SingleOrDefault(x => x.Id == registrar.ShipId) != null;
        }

        private static bool IsAlreadyUpdated(Registrar z, RegistrarWriteDto registrar) {
            return z != null && z.PutAt != registrar.PutAt;
        }

    }

}