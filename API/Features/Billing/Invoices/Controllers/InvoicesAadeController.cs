using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesAadeController : ControllerBase {

        #region variables

        private readonly IInvoiceAadeRepository invoiceRepo;

        #endregion

        public InvoicesAadeController(IInvoiceAadeRepository invoiceRepo) {
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