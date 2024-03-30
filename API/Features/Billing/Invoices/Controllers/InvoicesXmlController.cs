using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesXmlController : ControllerBase {

        #region variables

        private readonly IInvoiceXmlRepository invoiceAadeRepo;
        private readonly IInvoiceReadRepository invoiceReadRepo;
        private readonly IMapper mapper;

        #endregion

        public InvoicesXmlController(IInvoiceXmlRepository invoiceAadeRepo, IInvoiceReadRepository invoiceReadRepo, IMapper mapper) {
            this.invoiceAadeRepo = invoiceAadeRepo;
            this.invoiceReadRepo = invoiceReadRepo;
            this.mapper = mapper;
        }

        [HttpGet("{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string invoiceId) {
            var x = await invoiceReadRepo.GetByIdForXmlAsync(invoiceId);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Invoice, InvoiceXmlBuilderVM>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost("upload")]
        [Authorize(Roles = "admin")]
        public ResponseWithBody Upload([FromBody] XmlInvoiceVM invoice) {
            var response = SavePrettyResponse(invoice, invoiceAadeRepo.UploadXMLAsync(XElement.Load(invoiceAadeRepo.CreateXMLFileAsync(invoice)), invoice.Credentials).Result);
            if (response.Contains("Success")) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Body = new {
                        invoice.InvoiceId,
                        response
                    },
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 402
                };
            }
        }

        private string SavePrettyResponse(XmlInvoiceVM invoice, string response) {
            return invoiceAadeRepo.SaveResponse(invoice, response
                .Replace("&lt;", "<")
                .Replace("&gt;", ">")
                .Replace("<string xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/\">", "")
                .Replace("</string>", "")).ToString();
        }

    }

}