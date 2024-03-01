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
using API.Features.Billing.Invoices;

namespace API.Features.Billing.Transactions {

    public class TransactionRepository : Repository<Transaction>, ITransactionRepository {

        private readonly IMapper mapper;

        public TransactionRepository(AppDbContext context, IMapper mapper, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<TransactionListVM>> GetAsync() {
            var invoice = await context.Invoices
                .AsNoTracking()
                .Where(x => x.DiscriminatorId == 2)
                .OrderBy(x => x.Date)
                .ToListAsync();
            return mapper.Map<IEnumerable<Invoice>, IEnumerable<TransactionListVM>>(invoice);
        }

        public async Task<Invoice> GetByIdAsync(string invoiceId, bool includeTables) {
            return includeTables
                ? await context.Invoices
                    .AsNoTracking()
                    .Include(x => x.Customer)
                    .Include(x => x.DocumentType)
                    .Include(x => x.PaymentMethod)
                    .Where(x => x.InvoiceId.ToString() == invoiceId)
                    .SingleOrDefaultAsync()
               : await context.Invoices
                    .AsNoTracking()
                    .Where(x => x.InvoiceId.ToString() == invoiceId)
                    .SingleOrDefaultAsync();
        }

    }

}