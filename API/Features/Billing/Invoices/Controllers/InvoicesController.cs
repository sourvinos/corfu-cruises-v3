using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase {

        #region variables

        private readonly IInvoiceRepository invoiceRepo;

        #endregion

        public InvoicesController(IInvoiceRepository invoiceRepo) {
            this.invoiceRepo = invoiceRepo;
        }

        [HttpPost("build")]
        [Authorize(Roles = "admin")]
        public void BuildAndWriteInvoice([FromBody] InvoiceVM invoice) {
            invoiceRepo.BuildXMLAsync(invoice);
        }

        [HttpPost("send")]
        [Authorize(Roles = "admin")]
        public void InvoiceXML([FromBody] InvoiceVM invoice) {
            // invoiceRepo.SendInvoiceAsync(invoiceRepo.BuildXMLAsync(invoice));
        }

    }

}