using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Features.Customers {

    public class CustomerValidation : Repository<Customer>, ICustomerValidation {

        public CustomerValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public int IsValid(Customer z, CustomerWriteDto customer) {
            return true switch {
                var x when x == IsAlreadyUpdated(z, customer) => 415,
                _ => 200,
            };
        }

        private static bool IsAlreadyUpdated(Customer z, CustomerWriteDto customer) {
            return z != null && z.PutAt != customer.PutAt;
        }

    }

}