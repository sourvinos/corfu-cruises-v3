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

namespace API.Features.VatRegimes {

    public class VatRegimeRepository : Repository<VatRegime>, IVatRegimeRepository {

        private readonly IMapper mapper;

        public VatRegimeRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<VatRegimeListVM>> GetAsync() {
            var vatRegimes = await context.VatRegimes
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<VatRegime>, IEnumerable<VatRegimeListVM>>(vatRegimes);
        }

        public async Task<IEnumerable<VatRegimeAutoCompleteVM>> GetAutoCompleteAsync() {
            var vatRegimes = await context.VatRegimes
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<VatRegime>, IEnumerable<VatRegimeAutoCompleteVM>>(vatRegimes);
        }

        public async Task<VatRegime> GetByIdAsync(string id) {
            return await context.VatRegimes
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id.ToString() == id);
        }

    }

}