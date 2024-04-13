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

namespace API.Features.Billing.Receipts {

    public class ReceiptRepository : Repository<Receipt>, IReceiptRepository {

        private readonly IMapper mapper;

        public ReceiptRepository(AppDbContext context, IMapper mapper, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<ReceiptListVM>> GetAsync() {
            var receipts = await context.Receipts
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.DocumentType)
                .Include(x => x.ShipOwner)
                .Where(x => x.DiscriminatorId == 2)
                .OrderBy(x => x.Date)
                .ToListAsync();
            return mapper.Map<IEnumerable<Receipt>, IEnumerable<ReceiptListVM>>(receipts);
        }

        public async Task<Receipt> GetByIdAsync(string transactionId, bool includeTables) {
            return includeTables
                ? await context.Receipts
                    .AsNoTracking()
                    .Include(x => x.Customer)
                    .Include(x => x.DocumentType)
                    .Include(x => x.PaymentMethod)
                    .Include(x => x.ShipOwner)
                    .Where(x => x.InvoiceId.ToString() == transactionId)
                    .SingleOrDefaultAsync()
               : await context.Receipts
                    .AsNoTracking()
                    .Where(x => x.InvoiceId.ToString() == transactionId)
                    .SingleOrDefaultAsync();
        }

        public async Task<Receipt> GetForViewerByIdAsync(string invoiceId) {
            var x = await context.Receipts
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.Customer).ThenInclude(x => x.Nationality)
                .Include(x => x.Customer).ThenInclude(x => x.TaxOffice)
                .Include(x => x.ShipOwner)
                .Include(x => x.ShipOwner)
                .Include(x => x.ShipOwner).ThenInclude(x => x.Nationality)
                .Include(x => x.ShipOwner).ThenInclude(x => x.TaxOffice)
                .Include(x => x.DocumentType)
                .Include(x => x.PaymentMethod)
                .Where(x => x.InvoiceId.ToString() == invoiceId)
                .SingleOrDefaultAsync();
            return x;
        }

    }

}