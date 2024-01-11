using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase {

        #region variables

        private readonly IInvoiceRepository invoiceRepo;

        #endregion

        public InvoicesController(IInvoiceRepository codeRepo) {
            this.invoiceRepo = codeRepo;
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public void InvoiceXML([FromBody] InvoiceVM invoice) {
            invoiceRepo.BuildInvoiceXML(invoice);
        }

    }

}