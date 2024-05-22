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

    }

}