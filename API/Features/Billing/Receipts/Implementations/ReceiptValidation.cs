using System;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace API.Features.Billing.Receipts {

    public class ReceiptValidation : Repository<Receipt>, IReceiptValidation {

        public ReceiptValidation(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) { }

        public async Task<int> IsValidAsync(Receipt z, ReceiptWriteDto receipt) {
            return true switch {
                var x when x == !await IsValidCustomer(receipt) => 450,
                var x when x == !await IsValidDocumentType(receipt) => 465,
                var x when x == IsAlreadyUpdated(z, receipt) => 415,
                _ => 200,
            };
        }

        private async Task<bool> IsValidCustomer(ReceiptWriteDto receipt) {
            if (receipt.TransactionId == Guid.Empty) {
                return await context.Customers
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == receipt.CustomerId && x.IsActive) != null;
            }
            return context.Customers
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == receipt.CustomerId) != null;
        }

        private async Task<bool> IsValidDocumentType(ReceiptWriteDto receipt) {
            if (receipt.TransactionId == Guid.Empty) {
                return await context.DocumentTypes
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == receipt.DocumentTypeId && x.IsActive) != null;
            }
            return context.DocumentTypes
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == receipt.DocumentTypeId) != null;
        }

        private static bool IsAlreadyUpdated(Receipt z, ReceiptWriteDto transaction) {
            return z != null && z.PutAt != transaction.PutAt;
        }

    }

}