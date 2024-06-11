using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace API.Features.RetailSales {

    [Route("api/[controller]")]
    public class RetailSalesXmlController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IRetailSaleReadRepository invoiceReadRepo;
        private readonly IRetailSaleXmlRepository invoiceXmlRepo;

        #endregion

        public RetailSalesXmlController(IRetailSaleReadRepository invoiceReadRepo, IRetailSaleXmlRepository invoiceXmlRepo, IMapper mapper) {
            this.invoiceReadRepo = invoiceReadRepo;
            this.invoiceXmlRepo = invoiceXmlRepo;
            this.mapper = mapper;
        }

        [HttpGet("{reservationId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string reservationId) {
            var x = await invoiceReadRepo.GetByIdForXmlAsync(reservationId);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<RetailSale, RetailSaleXmlBuilderVM>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost("uploadInvoice")]
        [Authorize(Roles = "admin")]
        public ResponseWithBody UploadInvoice([FromBody] XmlRetailSaleVM invoice) {
            var response = SaveInvoicePrettyResponse(invoice.InvoiceHeader, "xmls", invoiceXmlRepo.UploadXMLAsync(XElement.Load(invoiceXmlRepo.CreateXMLFileAsync(invoice)), invoice.Credentials).Result);
            if (response.Contains("Success")) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Body = new {
                        invoice.ReservationId,
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

        // [HttpPost("cancelInvoice")]
        // [Authorize(Roles = "admin")]
        // public ResponseWithBody CancelInvoice([FromBody] XmlInvoiceVM invoice) {
        //     var response = SaveInvoicePrettyResponse(invoice.InvoiceHeader, "xmlsCancelled", invoiceAadeRepo.CancelInvoiceAsync(invoice.Aade.Mark, invoice.Credentials).Result);
        //     if (response.Contains("Success")) {
        //         return new ResponseWithBody {
        //             Code = 200,
        //             Icon = Icons.Success.ToString(),
        //             Body = new {
        //                 response
        //             },
        //             Message = ApiMessages.OK()
        //         };
        //     } else {
        //         throw new CustomException() {
        //             ResponseCode = 402
        //         };
        //     }
        // }

        private string SaveInvoicePrettyResponse(XmlRetailSaleHeaderVM invoice, string subdirectory, string response) {
            return invoiceXmlRepo.SaveInvoiceResponse(invoice, subdirectory, response
                .Replace("&lt;", "<")
                .Replace("&gt;", ">")
                .Replace("<string xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/\">", "")
                .Replace("</string>", "")).ToString();
        }

    }

}