using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using API.Infrastructure.Implementations;
using API.Infrastructure.Users;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Reservations.Customers {

    public class CustomerLedgerRepository : Repository<Customer>, ICustomerLedgerRepository {

        private readonly IMapper mapper;

        public CustomerLedgerRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<CustomerLedgerDetailLineVM>> GetLedgerAsync(int id) {
            var x = await context.Invoices
                .Include(x => x.Customer)
                .Where(x => x.CustomerId == id)
                .OrderBy(x => x.Date)
                .Select(x => new CustomerLedgerDetailLineVM {
                    Date = DateHelpers.DateToISOString(x.Date),
                    CustomerId = x.CustomerId,
                    DocumentTypeId = x.DocumentTypeId,
                    Debit = x.DocumentType.Customers == "+" ? x.GrossAmount : 0,
                    Credit = x.DocumentType.Customers == "-" ? x.GrossAmount : 0
                }).ToListAsync();
            return x;
        }

        public IEnumerable<CustomerLedgerDetailLineVM> BuildBalance(IEnumerable<CustomerLedgerDetailLineVM> records) {
            decimal balance = 0;
            foreach (var record in records) {
                balance = balance + record.Debit - record.Credit;
                record.Balance = balance;
            }
            return records;
        }

        public CustomerLedgerVM BuildLedger(IEnumerable<CustomerLedgerDetailLineVM> records, string fromDate) {
            decimal debit = 0;
            decimal credit = 0;
            decimal balance = 0;
            foreach (var record in records) {
                if (Convert.ToDateTime(record.Date) < Convert.ToDateTime(fromDate)) {
                    debit += record.Debit;
                    credit += record.Credit;
                    balance = balance + record.Debit - record.Credit;
                }
            }
            var previousPeriod = new CustomerLedgerVM {
                Previous = new PreviousPeriod {
                    Debit = debit,
                    Credit = credit,
                    Balance = balance
                }
            };
            foreach (var record in records) {
                if (Convert.ToDateTime(record.Date) >= Convert.ToDateTime(fromDate)) {
                    previousPeriod.Requested.Add(record);
                }
            }
            return previousPeriod;
        }

    }

}
