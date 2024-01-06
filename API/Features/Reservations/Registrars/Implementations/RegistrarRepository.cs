using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Features.Reservations.Registrars {

    public class RegistrarRepository : Repository<Registrar>, IRegistrarRepository {

        private readonly IMapper mapper;

        public RegistrarRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<RegistrarListVM>> GetAsync() {
            var registrars = await context.Registrars
                .AsNoTracking()
                .Include(x => x.Ship)
                .OrderBy(x => x.Ship.Description).ThenBy(x => !x.IsPrimary).ThenBy(x => x.Fullname)
                .ToListAsync();
            return mapper.Map<IEnumerable<Registrar>, IEnumerable<RegistrarListVM>>(registrars);
        }

        public async Task<IEnumerable<RegistrarAutoCompleteVM>> GetAutoCompleteAsync() {
            var registrars = await context.Registrars
                .AsNoTracking()
                .OrderBy(x => x.Fullname)
                .ToListAsync();
            return mapper.Map<IEnumerable<Registrar>, IEnumerable<RegistrarAutoCompleteVM>>(registrars);
        }

        public async Task<Registrar> GetByIdAsync(int id, bool includeTables) {
            return includeTables
                ? await context.Registrars
                    .AsNoTracking()
                    .Include(x => x.Ship)
                    .SingleOrDefaultAsync(x => x.Id == id)
                : await context.Registrars
                    .AsNoTracking()
                    .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> ValidateForManifest(int shipId) {
            var activeRegistrars = await context.Registrars.Where(x => x.ShipId == shipId && x.IsActive).ToListAsync();
            var primaryRegistrars = activeRegistrars.Where(x => x.IsPrimary);
            var secondaryRegistrars = activeRegistrars.Where(x => !x.IsPrimary);
            return activeRegistrars.Count == 2 && primaryRegistrars.Count() == 1 && secondaryRegistrars.Count() == 1;
        }

    }

}