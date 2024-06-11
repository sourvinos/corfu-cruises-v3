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
using Microsoft.EntityFrameworkCore.Storage;

namespace API.Features.RetailSales {

    public class RetailSaleReadRepository : Repository<RetailSale>, IRetailSaleReadRepository {

        private readonly IMapper mapper;
        private readonly TestingEnvironment testingEnvironment;

        public RetailSaleReadRepository(AppDbContext context, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
            this.testingEnvironment = testingEnvironment.Value;
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

        public async Task<RetailSale> GetByIdForXmlAsync(string reservationId) {
            return await context.RetailSales
                .AsNoTracking()
                .Include(x => x.ShipOwner).ThenInclude(x => x.Nationality)
                .Include(x => x.DocumentType)
                .Include(x => x.PaymentMethod)
                .SingleOrDefaultAsync(x => x.ReservationId.ToString() == reservationId);
        }

        public async Task<RetailSale> GetByIdForPdfAsync(int id) {
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
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<RetailSale> GetByIdForPatchEmailSent(int id) {
            return await context.RetailSales
                .AsNoTracking()
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<RetailSale> GetByIdForPatchAade(string reservationId) {
            return await context.RetailSales
                .AsNoTracking()
                .Where(x => x.ReservationId.ToString() == reservationId)
                .SingleOrDefaultAsync();
        }

        public void UpdateIsEmailSent(RetailSale invoice) {
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

        public Task<RetailSale> GetByIdForPdfAsync(string id) {
            throw new NotImplementedException();
        }

        public Task<RetailSale> GetByIdForPatchEmailSent(string id) {
            throw new NotImplementedException();
        }

    }

}