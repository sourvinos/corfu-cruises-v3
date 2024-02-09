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

namespace API.Features.Billing.Invoices {

    public class InvoiceReadRepository : Repository<Invoice>, IInvoiceReadRepository {

        private readonly IMapper mapper;

        public InvoiceReadRepository(AppDbContext context, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<InvoiceListVM>> GetAsync() {
            var invoices = await context.Invoices
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.Destination)
                .Include(x => x.DocumentType)
                .Include(x => x.Ship)
                .OrderBy(x => x.Date)
                .ToListAsync();
            return mapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceListVM>>(invoices);
        }

        public async Task<IEnumerable<InvoiceListVM>> GetForPeriodAsync(string from, string to) {
            var invoices = await context.Invoices
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.Destination)
                .Include(x => x.DocumentType)
                .Include(x => x.Ship)
                .Where(x => x.Date >= Convert.ToDateTime(from) && x.Date <= Convert.ToDateTime(to))
                .OrderBy(x => x.Date)
                .ToListAsync();
            return mapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceListVM>>(invoices);
        }

        public async Task<Invoice> GetByIdAsync(string invoiceId, bool includeTables) {
            return includeTables
                ? await context.Invoices
                    .AsNoTracking()
                    .Include(x => x.Customer)
                    .Include(x => x.Destination)
                    .Include(x => x.Ship)
                    .Include(x => x.DocumentType)
                    .Include(x => x.PaymentMethod)
                    .Include(x => x.Aade)
                    .Include(x => x.InvoicesPorts).ThenInclude(x => x.Port)
                    .Where(x => x.InvoiceId.ToString() == invoiceId)
                    .SingleOrDefaultAsync()
               : await context.Invoices
                    .AsNoTracking()
                    .Include(x => x.Aade)
                    .Include(x => x.InvoicesPorts).ThenInclude(x => x.Port)
                    .Where(x => x.InvoiceId.ToString() == invoiceId)
                    .SingleOrDefaultAsync();
        }

    }

}