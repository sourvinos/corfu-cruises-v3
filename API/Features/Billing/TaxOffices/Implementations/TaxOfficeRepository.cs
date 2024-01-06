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

namespace API.Features.Billing.TaxOffices {

    public class TaxOfficeRepository : Repository<TaxOffice>, ITaxOfficeRepository {

        private readonly IMapper mapper;

        public TaxOfficeRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<TaxOfficeListVM>> GetAsync() {
            var taxOffices = await context.TaxOffices
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<TaxOffice>, IEnumerable<TaxOfficeListVM>>(taxOffices);
        }

        public async Task<IEnumerable<TaxOfficeAutoCompleteVM>> GetAutoCompleteAsync() {
            var taxOffices = await context.TaxOffices
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<TaxOffice>, IEnumerable<TaxOfficeAutoCompleteVM>>(taxOffices);
        }

        public async Task<TaxOffice> GetByIdAsync(string id) {
            return await context.TaxOffices
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id.ToString() == id);
        }

    }

}