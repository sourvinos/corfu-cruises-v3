using System;
using System.Collections.Generic;
using System.Linq;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using API.Features.Billing.Transactions;
using AutoMapper;
using System.Threading.Tasks;
using API.Features.Reservations.Customers;

namespace API.Features.Billing.Revenues {

    public class RevenuesRepository : Repository<RevenuesRepository>, IRevenuesRepository {

        private readonly IMapper mapper;

        public RevenuesRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager, IMapper mapper) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<RevenuesVM>> GetForRevenues(string fromDate, string toDate, int customerId, int? shipOwnerId) {
            var records = await context.Transactions
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.DocumentType)
                .Where(x => x.Date <= Convert.ToDateTime(toDate)
                    && (x.CustomerId == customerId)
                    && (x.ShipOwner.Id == shipOwnerId || shipOwnerId == null)
                    && (x.DiscriminatorId == 1)
                    && (x.IsCancelled == false))
                .OrderBy(x => x.Date).ThenBy(x => x.Customer.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<TransactionsBase>, IEnumerable<RevenuesVM>>(records);
        }

        public IEnumerable<RevenuesVM> BuildBalanceForRevenues(IEnumerable<RevenuesVM> records) {
            decimal balance = 0;
            foreach (var record in records) {
                balance = balance + record.Debit - record.Credit;
                record.Balance = balance;
            }
            return records;
        }

        public RevenuesVM BuildPrevious(SimpleEntity customer, IEnumerable<RevenuesVM> records, string fromDate) {
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
            var total = BuildTotalLine(customer, debit, credit, balance, "ΣΥΝΟΛΑ ΠΡΟΗΓΟΥΜΕΝΗΣ ΠΕΡΙΟΔΟΥ");
            return total;
        }

        public List<RevenuesVM> BuildRequested(SimpleEntity customer, IEnumerable<RevenuesVM> records, string fromDate) {
            decimal debit = 0;
            decimal credit = 0;
            decimal balance = 0;
            var requestedPeriod = new List<RevenuesVM> { };
            foreach (var record in records) {
                if (Convert.ToDateTime(record.Date) >= Convert.ToDateTime(fromDate)) {
                    requestedPeriod.Add(record);
                    debit += record.Debit;
                    credit += record.Credit;
                    balance += record.Debit - record.Credit;
                }
            }
            var total = BuildTotalLine(customer, debit, credit, balance, "ΣΥΝΟΛΑ ΖΗΤΟΥΜΕΝΗΣ ΠΕΡΙΟΔΟΥ");
            requestedPeriod.Add(total);
            return requestedPeriod;
        }

        public RevenuesVM BuildTotal(SimpleEntity customer, IEnumerable<RevenuesVM> records) {
            decimal debit = 0;
            decimal credit = 0;
            decimal balance = 0;
            foreach (var record in records) {
                debit += record.Debit;
                credit += record.Credit;
                balance += record.Debit - record.Credit;
            }
            var total = BuildTotalLine(customer, debit, credit, balance, "ΓΕΝΙΚΑ ΣΥΝΟΛΑ");
            return total;
        }

        public List<RevenuesVM> MergePreviousRequestedAndTotal(RevenuesVM previousPeriod, List<RevenuesVM> requestedPeriod, RevenuesVM total) {
            var final = new List<RevenuesVM> {
                previousPeriod
            };
            foreach (var record in requestedPeriod) {
                final.Add(record);
            }
            final.Add(total);
            return final;
        }

        public RevenuesSummaryVM Summarize(SimpleEntity customer, IEnumerable<RevenuesVM> records) {
            var previousBalance = records.First().Balance;
            var requestedDebit = records.SkipLast(1).Last().Debit;
            var requestedCredit = records.SkipLast(1).Last().Credit;
            var requestedBalance = records.SkipLast(1).Last().Balance;
            var actualBalance = previousBalance + requestedBalance;
            var summary = new RevenuesSummaryVM {
                Customer = new SimpleEntity {
                    Id = customer.Id,
                    Description = customer.Description
                },
                PreviousBalance = previousBalance,
                Debit = requestedDebit,
                Credit = requestedCredit,
                Balance = requestedDebit - requestedCredit,
                ActualBalance = actualBalance
            };
            return summary;
        }

        public async Task<IEnumerable<RevenuesVM>> GetForBalanceAsync(int customerId) {
            var records = await context.Transactions
                .AsNoTracking()
                .Include(x => x.Customer)
                .Include(x => x.DocumentType)
                .Where(x => x.CustomerId == customerId)
                .ToListAsync();
            return mapper.Map<IEnumerable<TransactionsBase>, IEnumerable<RevenuesVM>>(records);
        }

        private static RevenuesVM BuildTotalLine(SimpleEntity customer, decimal debit, decimal credit, decimal balance, string label) {
            var total = new RevenuesVM {
                Date = "",
                Customer = new SimpleEntity {
                    Id = customer.Id,
                    Description = customer.Description
                },
                Debit = debit,
                Credit = credit,
                Balance = balance
            };
            return total;
        }

    }

}