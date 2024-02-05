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

namespace API.Features.Reservations.Customers {

    public class CustomerRepository : Repository<Customer>, ICustomerRepository {

        private readonly IMapper mapper;

        public CustomerRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<CustomerListVM>> GetAsync() {
            var customers = await context.Customers
                .AsNoTracking()
                .OrderBy(x => x.Abbreviation)
                .ToListAsync();
            return mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerListVM>>(customers);
        }

        public async Task<IEnumerable<CustomerAutoCompleteVM>> GetAutoCompleteAsync() {
            var customers = await context.Customers
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerAutoCompleteVM>>(customers);
        }

        public async Task<Customer> GetByIdAsync(int id, bool includeTables) {
            return includeTables
                ? await context.Customers
                    .AsNoTracking()
                    .Include(x => x.Nationality)
                    .Include(x => x.TaxOffice)
                    .Include(x => x.VatRegime)
                    .SingleOrDefaultAsync(x => x.Id == id)
                : await context.Customers
                    .AsNoTracking()
                    .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}