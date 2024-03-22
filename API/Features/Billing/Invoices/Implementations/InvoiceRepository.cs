using System.Collections.Generic;
using System.Linq;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using AutoMapper;
using API.Features.Billing.Ledgers;

namespace API.Features.Billing.Invoices {

    public class InvoiceRepository : Repository<Invoice>, IInvoiceRepository {

        private readonly IMapper mapper;

        public InvoiceRepository(AppDbContext context, IMapper mapper, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<InvoiceListVM>> GetAsync() {
            var receipts = await context.Invoices
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.DocumentType)
                .Where(x => x.DiscriminatorId == 2)
                .OrderBy(x => x.Date)
                .ToListAsync();
            return mapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceListVM>>(receipts);
        }

        public async Task<Invoice> GetByIdAsync(string transactionId, bool includeTables) {
            return includeTables
                ? await context.Invoices
                    .AsNoTracking()
                    .Include(x => x.Customer)
                    .Include(x => x.DocumentType)
                    .Include(x => x.PaymentMethod)
                    .Where(x => x.InvoiceId.ToString() == transactionId)
                    .SingleOrDefaultAsync()
               : await context.Invoices
                    .AsNoTracking()
                    .Where(x => x.InvoiceId.ToString() == transactionId)
                    .SingleOrDefaultAsync();
        }

        public decimal BuildBalance(IEnumerable<LedgerVM> records) {
            decimal balance = 0;
            foreach (var record in records) {
                balance = balance + record.Debit - record.Credit;
                record.Balance = balance;
            }
            return balance;
        }

    }

}