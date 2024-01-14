using System.IO;
using System.Xml.Linq;
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

        [HttpPost("build")]
        [Authorize(Roles = "admin")]
        public void BuildInvoice([FromBody] InvoiceVM document) {
            string docPath = Directory.GetCurrentDirectory() + "\\Output\\File.xml";
            using StreamWriter outputFile = new(Path.Combine(docPath));
            outputFile.WriteLine(invoiceRepo.BuildInvoice(document));
        }

        [HttpPost("send")]
        [Authorize(Roles = "admin")]
        public void InvoiceXML([FromBody] InvoiceVM invoice) {
            invoiceRepo.SendInvoiceAsync(invoiceRepo.BuildInvoice(invoice));
        }

    }

}