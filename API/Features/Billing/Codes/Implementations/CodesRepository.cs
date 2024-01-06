using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Billing.Codes {

    public class CodeRepository : Repository<Code>, ICodeRepository {

        private readonly IMapper mapper;

        public CodeRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<CodeListVM>> GetAsync() {
            var codes = await context.Codes
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Code>, IEnumerable<CodeListVM>>(codes);
        }

        public async Task<IEnumerable<CodeAutoCompleteVM>> GetAutoCompleteAsync() {
            var codes = await context.Codes
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Code>, IEnumerable<CodeAutoCompleteVM>>(codes);
        }

        public async Task<Code> GetByIdAsync(string id) {
            return await context.Codes
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id.ToString() == id);
        }

    }

}