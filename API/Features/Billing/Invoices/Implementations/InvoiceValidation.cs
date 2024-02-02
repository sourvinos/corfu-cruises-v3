using System;
using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Extensions;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Billing.Invoices {

    public class InvoiceValidation : Repository<Invoice>, IInvoiceValidation {

        private readonly IHttpContextAccessor httpContext;
        private readonly UserManager<UserExtended> userManager;

        public InvoiceValidation(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.httpContext = httpContext;
            this.userManager = userManager;
        }

        public bool IsUserOwner(int customerId) {
            return Identity.GetConnectedUserDetails(userManager, Identity.GetConnectedUserId(httpContext)).CustomerId == customerId;
        }

        private static bool IsAlreadyUpdated(Invoice z, InvoiceWriteDto invoice) {
            return z != null && z.PutAt != invoice.PutAt;
        }

        public async Task<int> IsValidAsync(Invoice z, InvoiceWriteDto invoice) {
            return true switch {
                var x when x == !await IsValidCustomer(invoice) => 450,
                var x when x == !await IsValidDestination(invoice) => 451,
                var x when x == !await IsValidShip(invoice) => 454,
                var x when x == IsAlreadyUpdated(z, invoice) => 415,
                _ => 200,
            };
        }

        private async Task<bool> IsValidCustomer(InvoiceWriteDto invoice) {
            if (invoice.InvoiceId == Guid.Empty) {
                return await context.Customers
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == invoice.CustomerId && x.IsActive) != null;
            }
            return await context.Customers
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == invoice.CustomerId) != null;
        }

        private async Task<bool> IsValidDestination(InvoiceWriteDto invoice) {
            if (invoice.InvoiceId == Guid.Empty) {
                return await context.Destinations
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == invoice.DestinationId && x.IsActive) != null;
            }
            return await context.Destinations
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == invoice.DestinationId) != null;
        }

        private async Task<bool> IsValidShip(InvoiceWriteDto invoice) {
            if (invoice.InvoiceId == Guid.Empty) {
                return await context.Ships
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == invoice.ShipId && x.IsActive) != null;
            }
            return await context.Ships
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == invoice.ShipId) != null;
        }

    }

}