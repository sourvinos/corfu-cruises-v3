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

namespace API.Features.Billing.Ledgers {

    public class LedgerRepository : Repository<LedgerRepository>, ILedgerRepository {

        private readonly IHttpContextAccessor httpContext;
        private readonly UserManager<UserExtended> userManager;

        public LedgerRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.httpContext = httpContext;
            this.userManager = userManager;
        }

        public IEnumerable<LedgerVM> Get(string fromDate, string toDate, int[] customerIds) {
            var connectedCustomerId = GetConnectedCustomerIdForConnectedUser();
            var records = context.Invoices
                .AsNoTracking()
                .Include(x => x.Customer)
                .Where(x => x.Date >= Convert.ToDateTime(fromDate)
                    && x.Date <= Convert.ToDateTime(toDate)
                    && (connectedCustomerId == null
                        ? customerIds.Contains(x.CustomerId)
                        : x.CustomerId == connectedCustomerId))
                .AsEnumerable()
                .GroupBy(x => new { x.Customer.Id, x.Customer.Description }).OrderBy(x => x.Key.Description)
                .Select(x => new LedgerVM {
                    Customer = new SimpleEntity {
                        Id = x.Key.Id,
                        Description = x.Key.Description
                    }
                });
            return records;
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