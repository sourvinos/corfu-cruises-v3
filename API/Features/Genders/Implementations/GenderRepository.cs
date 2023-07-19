using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Genders {

    public class GenderRepository : Repository<Gender>, IGenderRepository {

        private readonly IMapper mapper;

        public GenderRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings) : base(appDbContext, httpContext, settings) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<GenderListVM>> GetAsync() {
            var genders = await context.Genders
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Gender>, IEnumerable<GenderListVM>>(genders);
        }

        public async Task<IEnumerable<GenderAutoCompleteVM>> GetAutoCompleteAsync() {
            var genders = await context.Genders
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Gender>, IEnumerable<GenderAutoCompleteVM>>(genders);
        }

        public async Task<Gender> GetByIdAsync(int id) {
            return await context.Genders
                .AsNoTracking()
                .Include(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}