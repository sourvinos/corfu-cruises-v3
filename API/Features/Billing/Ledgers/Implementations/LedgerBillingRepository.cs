using System;
using System.Collections.Generic;
using System.Linq;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Extensions;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using API.Features.Billing.Transactions;
using AutoMapper;

namespace API.Features.Billing.Ledgers {

    public class LedgerBillingRepository : Repository<LedgerBillingRepository>, ILedgerBillingRepository {

        private readonly IHttpContextAccessor httpContext;
        private readonly UserManager<UserExtended> userManager;
        private readonly IMapper mapper;

        public LedgerBillingRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager, IMapper mapper) : base(appDbContext, httpContext, settings, userManager) {
            this.httpContext = httpContext;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        public IEnumerable<LedgerVM> Get(string fromDate, string toDate, int customerId) {
            var connectedCustomerId = GetConnectedCustomerIdForConnectedUser();
            var records = context.Transactions
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.DocumentType)
                .Where(x => x.Date <= Convert.ToDateTime(toDate)
                    && (connectedCustomerId == null
                        ? x.CustomerId == customerId
                        : x.CustomerId == connectedCustomerId))
                .OrderBy(x => x.Date)
                .ToList();
            return mapper.Map<IEnumerable<TransactionBase>, IEnumerable<LedgerVM>>(records);
        }

        public IEnumerable<LedgerVM> BuildBalance(IEnumerable<LedgerVM> records) {
            decimal balance = 0;
            foreach (var record in records) {
                balance = balance + record.Debit - record.Credit;
                record.Balance = balance;
            }
            return records;
        }

        public PreviousPeriodLedgerVM BuildPreviousBalance(IEnumerable<LedgerVM> records, string fromDate) {
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
            return new PreviousPeriodLedgerVM {
                Debit = debit,
                Credit = credit,
                Balance = balance
            };
        }

        public List<LedgerVM> BuildRequestedPeriod(IEnumerable<LedgerVM> records, string fromDate) {
            var requestedPeriod = new List<LedgerVM> { };
            foreach (var record in records) {
                if (Convert.ToDateTime(record.Date) >= Convert.ToDateTime(fromDate)) {
                    requestedPeriod.Add(record);
                }
            }
            return requestedPeriod;
        }

        public FinalLedgerVM MergePreviousAndRequestedPeriods(PreviousPeriodLedgerVM previousPeriod, List<LedgerVM> requestedPeriod) {
            var final = new FinalLedgerVM {
                PreviousPeriod = previousPeriod,
                RequestedPeriod = requestedPeriod
            };
            return final;
        }

        private int? GetConnectedCustomerIdForConnectedUser() {
            var isUserAdmin = Identity.IsUserAdmin(httpContext);
            if (!isUserAdmin) {
                var simpleUser = Identity.GetConnectedUserId(httpContext);
                var connectedUserDetails = Identity.GetConnectedUserDetails(userManager, simpleUser);
                return (int)connectedUserDetails.CustomerId;
            }
            return null;
        }

    }

}