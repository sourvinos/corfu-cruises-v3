using System.Linq;
using API.Features.Reservations.Reservations;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Reservations.Manifest {

    public class ManifestRepository : Repository<Reservation>, IManifestRepository {

        private readonly IMapper mapper;

        public ManifestRepository(AppDbContext appDbContext, IMapper mapper, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public ManifestFinalVM Get(string date, int destinationId, int portId, int? shipId) {
            var manifest = new ManifestInitialVM {
                Date = date,
                Destination = context.Destinations
                    .FirstOrDefault(x => x.Id == destinationId),
                Ship = context.Ships
                    .Include(x => x.ShipOwner)
                    .Include(x => x.Registrars.Where(x => x.IsActive))
                    .Include(x => x.ShipCrews.Where(x => x.IsActive))
                    .Include(x => x.ShipCrews.Where(x => x.IsActive)).ThenInclude(x => x.Gender)
                    .Include(x => x.ShipCrews.Where(x => x.IsActive)).ThenInclude(x => x.Nationality)
                    .Include(x => x.ShipCrews.Where(x => x.IsActive)).ThenInclude(x => x.Occupant)
                    .FirstOrDefault(x => x.Id == shipId),
                ShipRoute = null,
                Passengers = context.Passengers
                    .Include(x => x.Nationality)
                    .Include(x => x.Occupant)
                    .Include(x => x.Gender)
                    .Include(x => x.Reservation)
                    .Where(x => x.Reservation.Date.ToString() == date
                        && x.Reservation.DestinationId == destinationId
                        && x.Reservation.ShipId == shipId
                        && x.Reservation.PortId == portId
                        && x.IsBoarded)
                    .ToList()
            };
            return mapper.Map<ManifestInitialVM, ManifestFinalVM>(manifest);
        }

    }

}