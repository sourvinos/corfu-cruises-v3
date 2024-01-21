using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase {

        #region variables

        private readonly IHttpContextAccessor httpContext;
        private readonly IInvoiceRepository invoiceRepo;
        private readonly IMapper mapper;

        #endregion

        public InvoicesController(IHttpContextAccessor httpContext, IMapper mapper, IInvoiceRepository invoiceRepo) {
            this.httpContext = httpContext;
            this.mapper = mapper;
            this.invoiceRepo = invoiceRepo;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<InvoiceListVM>> Get() {
            return await invoiceRepo.GetAsync();
        }

        [HttpGet("from/{from}/to/{to}")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<InvoiceListVM>> GetForPeriodAsync([FromRoute] string from, string to) {
            return await invoiceRepo.GetForPeriodAsync(from, to);
        }

    }

}