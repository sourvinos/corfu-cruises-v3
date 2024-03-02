using System;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace API.Features.Billing.Transactions {

    public class TransactionValidation : Repository<Transaction>, ITransactionValidation {

        public TransactionValidation(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) { }

        private static bool IsAlreadyUpdated(Transaction z, TransactionWriteDto transaction) {
            return z != null && z.PutAt != transaction.PutAt;
        }

        public async Task<int> IsValidAsync(Transaction z, TransactionWriteDto transaction) {
            return true switch {
                var x when x == !await IsValidCustomer(transaction) => 450,
                var x when x == IsAlreadyUpdated(z, transaction) => 415,
                _ => 200,
            };
        }

        private async Task<bool> IsValidCustomer(TransactionWriteDto transaction) {
            if (transaction.TransactionId == Guid.Empty) {
                return await context.Customers
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == transaction.CustomerId && x.IsActive) != null;
            }
            return context.Customers
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == transaction.CustomerId) != null;
        }

    }

}