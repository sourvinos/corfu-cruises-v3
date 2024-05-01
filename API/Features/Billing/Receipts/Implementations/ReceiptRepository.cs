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
using System;
using Microsoft.EntityFrameworkCore.Storage;

namespace API.Features.Billing.Receipts {

    public class ReceiptRepository : Repository<Receipt>, IReceiptRepository {

        private readonly IMapper mapper;
        private readonly TestingEnvironment testingEnvironment;

        public ReceiptRepository(AppDbContext context, IOptions<TestingEnvironment> testingEnvironment, IMapper mapper, IHttpContextAccessor httpContext, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
            this.testingEnvironment = testingEnvironment.Value;
        }

        public async Task<IEnumerable<ReceiptListVM>> GetAsync() {
            var receipts = await context.Receipts
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.DocumentType)
                .Include(x => x.PaymentMethod)
                .Include(x => x.ShipOwner)
                .Where(x => x.DiscriminatorId == 2)
                .OrderBy(x => x.Date)
                .ToListAsync();
            return mapper.Map<IEnumerable<Receipt>, IEnumerable<ReceiptListVM>>(receipts);
        }

        public async Task<IEnumerable<ReceiptListVM>> GetForPeriodAsync(ReceiptListCriteriaVM criteria) {
            var receipts = await context.Receipts
                 .AsNoTracking()
                 .Where(x => x.DiscriminatorId == 2)
                 .Include(x => x.Customer)
                 .Include(x => x.DocumentType)
                 .Include(x => x.PaymentMethod)
                 .Include(x => x.ShipOwner)
                 .Where(x => x.Date >= Convert.ToDateTime(criteria.FromDate) && x.Date <= Convert.ToDateTime(criteria.ToDate))
                 .OrderBy(x => x.Date).ThenBy(x => x.ShipOwner.Description).ThenBy(x => x.DocumentType.Description).ThenBy(x => x.InvoiceNo)
                 .ToListAsync();
            return mapper.Map<IEnumerable<Receipt>, IEnumerable<ReceiptListVM>>(receipts);
        }

        public async Task<Receipt> GetByIdAsync(string invoiceId, bool includeTables) {
            return includeTables
                ? await context.Receipts
                    .AsNoTracking()
                    .Include(x => x.Customer)
                    .Include(x => x.DocumentType)
                    .Include(x => x.PaymentMethod)
                    .Include(x => x.ShipOwner)
                    .Where(x => x.InvoiceId.ToString() == invoiceId)
                    .SingleOrDefaultAsync()
               : await context.Receipts
                    .AsNoTracking()
                    .Where(x => x.InvoiceId.ToString() == invoiceId)
                    .SingleOrDefaultAsync();
        }

        public async Task<Receipt> GetByIdForPdfAsync(string invoiceId) {
            return await context.Receipts
                .AsNoTracking()
                .Include(x => x.Customer).ThenInclude(x => x.TaxOffice)
                .Include(x => x.Customer).ThenInclude(x => x.Nationality)
                .Include(x => x.ShipOwner).ThenInclude(x => x.TaxOffice)
                .Include(x => x.ShipOwner).ThenInclude(x => x.Nationality)
                .Include(x => x.ShipOwner).ThenInclude(x => x.BankAccounts.Where(x => x.IsActive)).ThenInclude(x => x.Bank)
                .Include(x => x.DocumentType)
                .Include(x => x.PaymentMethod)
                .Where(x => x.InvoiceId.ToString() == invoiceId)
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

        public void UpdateIsEmailSent(Receipt invoice, string invoiceId) {
            using var transaction = context.Database.BeginTransaction();
            invoice.IsEmailSent = true;
            context.Receipts.Attach(invoice);
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

    }

}