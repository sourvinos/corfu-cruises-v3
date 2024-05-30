using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Features.RetailSales {

    [Route("api/[controller]")]
    public class RetailSalesController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IRetailSalePdfRepository invoicePdfRepo;
        private readonly IRetailSaleReadRepository retailSaleReadRepo;
        private readonly IRetailSaleUpdateRepository retailSaleUpdateRepo;

        private readonly IRetailSaleValidation retailSaleValidation;

        #endregion

        public RetailSalesController(IMapper mapper, IRetailSalePdfRepository invoicePdfRepo, IRetailSaleReadRepository retailSaleReadRepo, IRetailSaleUpdateRepository retailSaleUpdateRepo, IRetailSaleValidation retailSaleValidation) {
            this.invoicePdfRepo = invoicePdfRepo;
            this.mapper = mapper;
            this.retailSaleReadRepo = retailSaleReadRepo;
            this.retailSaleUpdateRepo = retailSaleUpdateRepo;
            this.retailSaleValidation = retailSaleValidation;
        }

        [HttpPost("{getForPeriod}")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<RetailSaleListVM>> GetForPeriodAsync([FromBody] RetailSaleListCriteriaVM criteria) {
            return await retailSaleReadRepo.GetForPeriodAsync(criteria);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PostAsync([FromBody] RetailSaleWriteDto invoice) {
            invoice.InvoiceNo = await retailSaleUpdateRepo.IncreaseInvoiceNoAsync(invoice);
            var x = retailSaleValidation.IsValidAsync(null, invoice);
            if (await x == 200) {
                var z = retailSaleUpdateRepo.Create(mapper.Map<RetailSaleWriteDto, RetailSale>((RetailSaleWriteDto)retailSaleUpdateRepo.AttachMetadataToPostDto(invoice)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = z.ReservationId.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = await x
                };
            }
        }

        [HttpPost("buildInvoicePdfs")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> BuildInvoicePdfs([FromBody] string[] invoiceIds) {
            var filenames = new List<string>();
            foreach (var invoiceId in invoiceIds) {
                var x = await retailSaleReadRepo.GetByIdForPdfAsync(invoiceId);
                if (x != null) {
                    var z = invoicePdfRepo.BuildPdf(mapper.Map<RetailSale, InvoicePdfVM>(x));
                    filenames.Add(z);
                } else {
                    throw new CustomException() {
                        ResponseCode = 404
                    };
                }
            }
            return new ResponseWithBody {
                Code = 200,
                Icon = Icons.Info.ToString(),
                Message = ApiMessages.OK(),
                Body = filenames.ToArray()
            };
        }

        [HttpGet("[action]/{filename}")]
        [Authorize(Roles = "admin")]
        public IActionResult OpenPdf([FromRoute] string filename) {
            return invoicePdfRepo.OpenPdf(filename);
        }

    }

}