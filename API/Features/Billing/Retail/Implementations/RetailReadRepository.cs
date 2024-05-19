using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;

namespace API.Features.Billing.Retail {

    public class RetailReadRepository : Repository<Retail>, IRetailReadRepository {

        private readonly IMapper mapper;

        public RetailReadRepository(AppDbContext context, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<RetailListVM>> GetAsync() {
            var invoices = await context.Retails
                .AsNoTracking()
                .Where(x => x.DiscriminatorId == 3)
                .Include(x => x.Customer)
                .Include(x => x.Destination)
                .Include(x => x.DocumentType)
                .OrderBy(x => x.Date)
                .ToListAsync();
            return mapper.Map<IEnumerable<Retail>, IEnumerable<RetailListVM>>(invoices);
        }

        public async Task<IEnumerable<RetailListVM>> GetForPeriodAsync(RetailListCriteriaVM criteria) {
            var invoices = await context.Retails
                .AsNoTracking()
                .Where(x => x.DiscriminatorId == 1)
                .Include(x => x.Customer)
                .Include(x => x.Destination)
                .Include(x => x.DocumentType)
                .Include(x => x.ShipOwner)
                .Include(x => x.Aade)
                .Where(x => x.Date >= Convert.ToDateTime(criteria.FromDate) && x.Date <= Convert.ToDateTime(criteria.ToDate))
                .OrderBy(x => x.Date).ThenBy(x => x.ShipOwner.Description).ThenBy(x => x.InvoiceNo)
                .ToListAsync();
            return mapper.Map<IEnumerable<Retail>, IEnumerable<RetailListVM>>(invoices);
        }

        public async Task<Retail> GetByIdAsync(string invoiceId, bool includeTables) {
            return includeTables
                ? await context.Retails
                    .AsNoTracking()
                    .Include(x => x.Customer).ThenInclude(x => x.TaxOffice)
                    .Include(x => x.Customer).ThenInclude(x => x.Nationality)
                    .Include(x => x.Destination)
                    .Include(x => x.DocumentType)
                    .Include(x => x.PaymentMethod)
                    .Include(x => x.Aade)
                    .Where(x => x.InvoiceId.ToString() == invoiceId)
                    .SingleOrDefaultAsync()
               : await context.Retails
                    .AsNoTracking()
                    .Include(x => x.Aade)
                    .Where(x => x.InvoiceId.ToString() == invoiceId)
                    .SingleOrDefaultAsync();
        }

        public async Task<RetailAade> GetInvoiceAadeByIdAsync(string invoiceId) {
            return await context.RetailsAade
                .AsNoTracking()
                .Where(x => x.InvoiceId.ToString() == invoiceId)
                .SingleOrDefaultAsync();
        }

    }

}