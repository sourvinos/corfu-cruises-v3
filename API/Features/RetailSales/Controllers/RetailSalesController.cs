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
        private readonly IRetailSaleReadRepository retailSaleReadRepo;
        private readonly IRetailSaleUpdateRepository retailSaleUpdateRepo;
        private readonly IRetailSaleValidation retailSaleValidation;

        #endregion

        public RetailSalesController(IMapper mapper, IRetailSaleEmailSender emailSender, IRetailSaleReadRepository retailSaleReadRepo, IRetailSaleUpdateRepository retailSaleUpdateRepo, IRetailSaleValidation retailSaleValidation) {
            this.emailSender = emailSender;
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

        [HttpPatch("retailSaleAade")]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PatchRetailSaleWithAade([FromBody] RetailSaleAadeVM invoiceAade) {
            var x = await retailSaleReadRepo.GetByIdForPatchAade(invoiceAade.ReservationId.ToString());
            if (x != null) {
                retailSaleUpdateRepo.UpdateAade(x, invoiceAade);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = invoiceAade.ReservationId.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}