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

namespace API.Features.RetailSales {

    public class RetailSaleValidation : Repository<RetailSale>, IRetailSaleValidation {

        public RetailSaleValidation(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) { }

        public async Task<int> IsValidAsync(RetailSale z, RetailSaleWriteDto invoice) {
            return true switch {
                var x when x == !IsValidIssueDate(invoice) => 405,
                var x when x == !await IsCompositeKeyValidAsync(invoice) => 466,
                var x when x == !await IsInvoiceCountEqualToLastInvoiceNo(invoice) => 467,
                var x when x == IsAlreadyUpdated(z, invoice) => 415,
                _ => 200,
            };
        }

        private static bool IsValidIssueDate(RetailSaleWriteDto invoice) {
            return DateHelpers.DateToISOString(invoice.Date) == DateHelpers.DateToISOString(DateHelpers.GetLocalDateTime());
        }

        private async Task<bool> IsCompositeKeyValidAsync(RetailSaleWriteDto invoice) {
            var x = await context.RetailSales
                .AsNoTracking()
                .Where(x => invoice.Date.Year == DateHelpers.GetLocalDateTime().Year && x.DocumentTypeId == invoice.DocumentTypeId && x.InvoiceNo == invoice.InvoiceNo)
                .SingleOrDefaultAsync();
            return x == null;
        }

        private async Task<bool> IsInvoiceCountEqualToLastInvoiceNo(RetailSaleWriteDto invoice) {
            var x = await context.RetailSales
                .AsNoTracking()
                .Where(x => invoice.Date.Year == DateHelpers.GetLocalDateTime().Year && x.DocumentTypeId == invoice.DocumentTypeId)
                .ToListAsync();
            return x.Count == invoice.InvoiceNo - 1;
        }

        private static bool IsAlreadyUpdated(RetailSale z, RetailSaleWriteDto invoice) {
            return z != null && z.PutAt != invoice.PutAt;
        }

    }

}