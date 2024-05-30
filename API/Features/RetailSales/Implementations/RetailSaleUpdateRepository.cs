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

namespace API.Features.RetailSales {

    public class RetailSaleUpdateRepository : Repository<RetailSale>, IRetailSaleUpdateRepository {

        private readonly TestingEnvironment testingEnvironment;

        public RetailSaleUpdateRepository(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.testingEnvironment = testingEnvironment.Value;
        }

        public RetailSale Update(Guid reservationId, RetailSale invoice) {
            using var transaction = context.Database.BeginTransaction();
            UpdateInvoice(invoice);
            context.SaveChanges();
            DisposeOrCommit(transaction);
            return invoice;
        }

        public async Task<int> IncreaseInvoiceNoAsync(RetailSaleWriteDto invoice) {
            var lastInvoiceNo = await context.RetailSales
                .AsNoTracking()
                .Where(x => invoice.Date.Year == DateHelpers.GetLocalDateTime().Year && x.DocumentTypeId == invoice.DocumentTypeId)
                .OrderBy(x => x.InvoiceNo)
                .Select(x => x.InvoiceNo)
                .LastOrDefaultAsync();
            return lastInvoiceNo += 1;
        }

        public void UpdateIsEmailSent(RetailSale invoice, string invoiceId) {
            using var transaction = context.Database.BeginTransaction();
            invoice.IsEmailSent = true;
            context.RetailSales.Attach(invoice);
            context.Entry(invoice).Property(x => x.IsEmailSent).IsModified = true;
            context.SaveChanges();
            DisposeOrCommit(transaction);
        }

        private void DisposeOrCommit(IDbContextTransaction transaction) {
            if (testingEnvironment.IsTesting) {
                transaction.Dispose();
            } else {
                transaction.Commit();
            }
        }

        private void UpdateInvoice(RetailSale invoice) {
            context.RetailSales.Update(invoice);
        }

    }

}