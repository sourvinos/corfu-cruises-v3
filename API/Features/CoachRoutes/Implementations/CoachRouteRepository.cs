using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.CoachRoutes {

    public class CoachRouteRepository : Repository<CoachRoute>, ICoachRouteRepository {

        private readonly IMapper mapper;

        public CoachRouteRepository(AppDbContext context, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(context, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<CoachRouteListVM>> GetAsync() {
            var coachRoutes = await context.CoachRoutes
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<CoachRoute>, IEnumerable<CoachRouteListVM>>(coachRoutes);
        }

        public async Task<IEnumerable<CoachRouteAutoCompleteVM>> GetAutoCompleteAsync() {
            var coachRoutes = await context.CoachRoutes
                .AsNoTracking()
                .OrderBy(x => x.Abbreviation)
                .ToListAsync();
            return mapper.Map<IEnumerable<CoachRoute>, IEnumerable<CoachRouteAutoCompleteVM>>(coachRoutes);
        }

        public async Task<CoachRoute> GetById(int id, bool includeTables) {
            return includeTables
                ? await context.CoachRoutes
                    .AsNoTracking()
                    .Include(x => x.Port)
                    .Include(x => x.User)
                    .SingleOrDefaultAsync(x => x.Id == id)
                : await context.CoachRoutes
                    .AsNoTracking()
                    .Include(x => x.User)
                    .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}