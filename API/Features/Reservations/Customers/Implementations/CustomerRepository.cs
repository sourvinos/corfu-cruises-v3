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

        public async Task<IEnumerable<CustomerBrowserStorageVM>> GetForBrowserStorageAsync() {
            var customers = await context.Customers
                .AsNoTracking()
                .Include(x => x.Nationality)
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerBrowserStorageVM>>(customers);
        }

        public async Task<CustomerBrowserStorageVM> UpdateBrowserStorageAsync(int id) {
            var customer = await context.Customers
                .AsNoTracking()
                .Include(x => x.Nationality)
                .OrderBy(x => x.Description)
                .SingleOrDefaultAsync(x => x.Id == id);
            return mapper.Map<Customer, CustomerBrowserStorageVM>(customer);
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