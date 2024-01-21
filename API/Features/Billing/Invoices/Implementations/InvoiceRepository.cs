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

    public class InvoiceRepository : Repository<Invoice>, IInvoiceRepository {

        private readonly IHttpContextAccessor httpContext;
        private readonly IMapper mapper;
        private readonly UserManager<UserExtended> userManager;

        public InvoiceRepository(AppDbContext context, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.httpContext = httpContext;
            this.mapper = mapper;
            this.userManager = userManager;
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

    }

}