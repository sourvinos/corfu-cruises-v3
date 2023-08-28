using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.CoachRoutes {

    public class CoachRouteRepository : Repository<CoachRoute>, ICoachRouteRepository {

        private readonly IMapper mapper;

        public CoachRouteRepository(AppDbContext context, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings) : base(context, httpContext, settings) {
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

        public async Task<CoachRoute> GetByIdAsync(int id, bool includeTables) {
            if (includeTables) {
                return context.CoachRoutes
                       .Join(context.Users,
                           supply => new { LINE_NO = supply.PortId, CUST_ORDER_ID = supply.HasTransfer },
                           demand => new { demand.Email, demand.Id },
                           (supply, demand) => new { custOrderLineReturn = demand })
                       .Select(s => s.custOrderLineReturn)
                       .ToList();
            }
            return includeTables
                ? await context.CoachRoutes
                    .AsNoTracking()
                    .Include(x => x.Port)
                    .Include(x => x.PostUser)
                    .Include(x => x.PutUser)
                    .SingleOrDefaultAsync(x => x.Id == id)
                : await context.CoachRoutes
                    .AsNoTracking()
                    .Include(x => x.PostUser)
                    .Include(x => x.PutUser)
                    .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}