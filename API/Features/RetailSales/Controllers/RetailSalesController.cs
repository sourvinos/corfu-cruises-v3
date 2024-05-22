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
        private readonly IRetailSaleReadRepository retailSaleReadRepo;
        private readonly IRetailSaleUpdateRepository retailSaleUpdateRepo;
        private readonly IRetailSaleValidation retailSaleValidation;

        #endregion

        public RetailSalesController(IMapper mapper, IRetailSaleReadRepository retailSaleReadRepo, IRetailSaleUpdateRepository retailSaleUpdateRepo, IRetailSaleValidation retailSaleValidation) {
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

    }

}