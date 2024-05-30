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
        private readonly IRetailSaleEmailSender emailSender;
        private readonly IRetailSalePdfRepository invoicePdfRepo;
        private readonly IRetailSaleReadRepository retailSaleReadRepo;
        private readonly IRetailSaleUpdateRepository retailSaleUpdateRepo;
        private readonly IRetailSaleValidation retailSaleValidation;

        #endregion

        public RetailSalesController(IMapper mapper, IRetailSaleEmailSender emailSender, IRetailSalePdfRepository invoicePdfRepo, IRetailSaleReadRepository retailSaleReadRepo, IRetailSaleUpdateRepository retailSaleUpdateRepo, IRetailSaleValidation retailSaleValidation) {
            this.emailSender = emailSender;
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

        [HttpGet("buildInvoicePdf/{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> BuildInvoicePdf(string invoiceId) {
            var x = await retailSaleReadRepo.GetByIdForPdfAsync(invoiceId);
            if (x != null) {
                var z = invoicePdfRepo.BuildPdf(mapper.Map<RetailSale, InvoicePdfVM>(x));
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

        [HttpPost("[action]")]
        [Authorize(Roles = "admin")]
        public Response EmailRetailSale([FromBody] EmailRetailSaleVM model) {
            var response = emailSender.SendRetailSaleToEmail(model);
            if (response.Exception == null) {
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                return new Response {
                    Code = 498,
                    Icon = Icons.Error.ToString(),
                    Id = null,
                    Message = response.Exception.Message
                };
            }
        }

        [HttpPatch("[action]/{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> PatchRetailSaleWithEmailSent(string invoiceId) {
            var x = await retailSaleReadRepo.GetByIdForPatchEmailSent(invoiceId);
            if (x != null) {
                retailSaleUpdateRepo.UpdateIsEmailSent(x, invoiceId);
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
            return new Response {
                Code = 200,
                Icon = Icons.Info.ToString(),
                Message = ApiMessages.OK()
            };
        }

        [HttpGet("[action]/{filename}")]
        [Authorize(Roles = "admin")]
        public IActionResult OpenPdf([FromRoute] string filename) {
            return invoicePdfRepo.OpenPdf(filename);
        }

    }

}