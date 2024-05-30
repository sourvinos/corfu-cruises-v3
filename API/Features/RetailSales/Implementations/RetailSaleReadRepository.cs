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

namespace API.Features.RetailSales {

    public class RetailSaleReadRepository : Repository<RetailSale>, IRetailSaleReadRepository {

        private readonly IMapper mapper;

        public RetailSaleReadRepository(AppDbContext context, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<RetailSaleListVM>> GetForPeriodAsync(RetailSaleListCriteriaVM criteria) {
            var invoices = await context.RetailSales
                .AsNoTracking()
                .Include(x => x.DocumentType)
                .Include(x => x.ShipOwner)
                .Include(x => x.Reservation).ThenInclude(x => x.Customer)
                .Where(x => x.Date >= Convert.ToDateTime(criteria.FromDate) && x.Date <= Convert.ToDateTime(criteria.ToDate))
                .OrderBy(x => x.Date).ThenBy(x => x.ShipOwner.Description).ThenBy(x => x.InvoiceNo)
                .ToListAsync();
            return mapper.Map<IEnumerable<RetailSale>, IEnumerable<RetailSaleListVM>>(invoices);
        }

        public async Task<RetailSale> GetByIdForXmlAsync(string invoiceId) {
            return await context.RetailSales
                .AsNoTracking()
                .Include(x => x.ShipOwner).ThenInclude(x => x.Nationality)
                .Include(x => x.DocumentType)
                .Include(x => x.PaymentMethod)
                .SingleOrDefaultAsync(x => x.ReservationId.ToString() == invoiceId);
        }

        public async Task<RetailSale> GetByIdForPdfAsync(string invoiceId) {
            return await context.RetailSales
                .Include(x => x.ShipOwner).ThenInclude(x => x.TaxOffice)
                .Include(x => x.ShipOwner).ThenInclude(x => x.Nationality)
                .Include(x => x.ShipOwner).ThenInclude(x => x.BankAccounts.Where(x => x.IsActive)).ThenInclude(x => x.Bank)
                .Include(x => x.DocumentType)
                .Include(x => x.PaymentMethod)
                .Include(x => x.Reservation)
                .Include(x => x.Reservation).ThenInclude(x => x.Destination)
                .Include(x => x.Reservation).ThenInclude(x => x.Customer)
                .Include(x => x.Reservation).ThenInclude(x => x.PickupPoint)
                .Include(x => x.Reservation).ThenInclude(x => x.Passengers)
                .SingleOrDefaultAsync(x => x.ReservationId.ToString() == invoiceId);
        }

    }

}