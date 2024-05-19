using System;
using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using API.Infrastructure.Helpers;
using System.Linq;

namespace API.Features.Billing.Retail {

    public class RetailValidation : Repository<Retail>, IRetailValidation {

        public RetailValidation(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) { }

        public async Task<int> IsValidAsync(Retail z, RetailWriteDto retail) {
            return true switch {
                var x when x == !IsValidIssueDate(retail) => 405,
                var x when x == !await IsCompositeKeyValidAsync(retail) => 466,
                var x when x == !await IsRetailCountEqualToLastRetailNo(retail) => 467,
                var x when x == !await IsValidCustomer(retail) => 450,
                var x when x == !await IsValidDestination(retail) => 451,
                var x when x == !await IsValidShip(retail) => 454,
                var x when x == IsAlreadyUpdated(z, retail) => 415,
                _ => 200,
            };
        }

        private static bool IsValidIssueDate(RetailWriteDto retail) {
            return retail.InvoiceId != Guid.Empty || DateHelpers.DateToISOString(retail.Date) == DateHelpers.DateToISOString(DateHelpers.GetLocalDateTime());
        }

        private async Task<bool> IsCompositeKeyValidAsync(RetailWriteDto retail) {
            if (retail.InvoiceId == Guid.Empty) {
                var x = await context.Transactions
                    .AsNoTracking()
                    .Where(x => retail.Date.Year == DateHelpers.GetLocalDateTime().Year && x.DocumentTypeId == retail.DocumentTypeId && x.InvoiceNo == retail.InvoiceNo)
                    .SingleOrDefaultAsync();
                return x == null;
            } else {
                return true;
            }
        }

        private async Task<bool> IsRetailCountEqualToLastRetailNo(RetailWriteDto retail) {
            if (retail.InvoiceId == Guid.Empty) {
                var x = await context.Transactions
                    .AsNoTracking()
                    .Where(x => retail.Date.Year == DateHelpers.GetLocalDateTime().Year && x.DocumentTypeId == retail.DocumentTypeId)
                    .ToListAsync();
                return x.Count == retail.InvoiceNo - 1;
            } else {
                return true;
            }
        }

        private static bool IsAlreadyUpdated(Retail z, RetailWriteDto retail) {
            return z != null && z.PutAt != retail.PutAt;
        }

        private async Task<bool> IsValidCustomer(RetailWriteDto retail) {
            if (retail.InvoiceId == Guid.Empty) {
                return await context.Customers
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == retail.CustomerId && x.IsActive) != null;
            }
            return await context.Customers
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == retail.CustomerId) != null;
        }

        private async Task<bool> IsValidDestination(RetailWriteDto retail) {
            if (retail.InvoiceId == Guid.Empty) {
                return await context.Destinations
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == retail.DestinationId && x.IsActive) != null;
            }
            return await context.Destinations
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == retail.DestinationId) != null;
        }

        private async Task<bool> IsValidShip(RetailWriteDto retail) {
            if (retail.InvoiceId == Guid.Empty) {
                return await context.Ships
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == retail.ShipId && x.IsActive) != null;
            }
            return await context.Ships
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == retail.ShipId) != null;
        }

    }

}