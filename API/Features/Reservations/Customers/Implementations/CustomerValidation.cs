using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Reservations.Customers {

    public class CustomerValidation : Repository<Customer>, ICustomerValidation {

        public CustomerValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public async Task<int> IsValidAsync(Customer z, CustomerWriteDto customer) {
            return true switch {
                var x when x == !await IsValidNationality(customer) => 456,
                var x when x == !await IsValidTaxOffice(customer) => 458,
                var x when x == !BalanceLimitMustBeZeroOrGreater(customer) => 461,
                var x when x == IsAlreadyUpdated(z, customer) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(Customer z, CustomerWriteDto customer) {
            return z != null && z.PutAt != customer.PutAt;
        }

        private async Task<bool> IsValidNationality(CustomerWriteDto customer) {
            if (customer.Id == 0) {
                return await context.Nationalities
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == customer.NationalityId && x.IsActive) != null;
            }
            return await context.Nationalities
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == customer.NationalityId) != null;
        }

        private async Task<bool> IsValidTaxOffice(CustomerWriteDto customer) {
            if (customer.Id == 0) {
                return await context.TaxOffices
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == customer.TaxOfficeId && x.IsActive) != null;
            }
            return await context.TaxOffices
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == customer.TaxOfficeId) != null;
        }

        private static bool BalanceLimitMustBeZeroOrGreater(CustomerWriteDto customer) {
            return customer.BalanceLimit >= 0;
        }

    }

}