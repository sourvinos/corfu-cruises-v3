using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Features.RetailSales {

    [Route("api/[controller]")]
    public class RetailSalesPdfController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IRetailSalePdfRepository retailSalePdfRepo;
        private readonly IRetailSaleReadRepository retailSaleReadRepo;

        #endregion

        public RetailSalesPdfController(IMapper mapper, IRetailSalePdfRepository retailSalePdfRepo, IRetailSaleReadRepository retailSaleReadRepo) {
            this.mapper = mapper;
            this.retailSalePdfRepo = retailSalePdfRepo;
            this.retailSaleReadRepo = retailSaleReadRepo;
        }

        [HttpGet("buildInvoicePdf/{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> BuildInvoicePdf(string invoiceId) {
            var x = await retailSaleReadRepo.GetByIdForPdfAsync(invoiceId);
            if (x != null) {
                var z = retailSalePdfRepo.BuildPdf(mapper.Map<RetailSale, InvoicePdfVM>(x));
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
            return new ResponseWithBody {
                Code = 200,
                Icon = Icons.Info.ToString(),
                Message = ApiMessages.OK(),
                Body = invoiceId
            };
        }

        [HttpPost("buildMultiPagePdf")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> BuildMultiPagePdfAsync([FromBody] string[] invoiceIds) {
            var invoices = new List<InvoicePdfVM>();
            foreach (var invoiceId in invoiceIds) {
                var x = await retailSaleReadRepo.GetByIdForPdfAsync(invoiceId);
                if (x != null) {
                    invoices.Add(mapper.Map<RetailSale, InvoicePdfVM>(x));
                } else {
                    throw new CustomException() {
                        ResponseCode = 404
                    };
                }
            }
            var filename = retailSalePdfRepo.BuildMultiPagePdf(invoices);
            return new ResponseWithBody {
                Code = 200,
                Icon = Icons.Info.ToString(),
                Message = ApiMessages.OK(),
                Body = filename
            };
        }

        [HttpGet("[action]/{filename}")]
        [Authorize(Roles = "admin")]
        public IActionResult OpenPdf([FromRoute] string filename) {
            return retailSalePdfRepo.OpenPdf(filename);
        }

    }

}