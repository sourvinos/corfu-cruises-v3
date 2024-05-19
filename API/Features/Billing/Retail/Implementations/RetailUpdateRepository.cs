using System;
using System.Linq;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using API.Infrastructure.Helpers;

namespace API.Features.Billing.Retail {

    public class RetailUpdateRepository : Repository<Retail>, IRetailUpdateRepository {

        private readonly TestingEnvironment testingEnvironment;

        public RetailUpdateRepository(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.testingEnvironment = testingEnvironment.Value;
        }

        public Retail Update(Guid invoiceId, Retail invoice) {
            using var transaction = context.Database.BeginTransaction();
            UpdateRetail(invoice);
            context.SaveChanges();
            DisposeOrCommit(transaction);
            return invoice;
        }

        public async Task<int> IncreaseRetailNoAsync(RetailCreateDto invoice) {
            var lastRetailNo = await context.Transactions
                .AsNoTracking()
                .Where(x => invoice.Date.Year == DateHelpers.GetLocalDateTime().Year && x.DocumentTypeId == invoice.DocumentTypeId)
                .OrderBy(x => x.InvoiceNo)
                .Select(x => x.InvoiceNo)
                .LastOrDefaultAsync();
            return lastRetailNo += 1;
        }

        public RetailAade UpdateRetailAade(RetailAade retailAade) {
            using var transaction = context.Database.BeginTransaction();
            context.RetailsAade.Update(retailAade);
            context.SaveChanges();
            DisposeOrCommit(transaction);
            return retailAade;
        }


        private void DisposeOrCommit(IDbContextTransaction transaction) {
            if (testingEnvironment.IsTesting) {
                transaction.Dispose();
            } else {
                transaction.Commit();
            }
        }

        private void UpdateRetail(Retail retail) {
            context.Retails.Update(retail);
        }

    }

}