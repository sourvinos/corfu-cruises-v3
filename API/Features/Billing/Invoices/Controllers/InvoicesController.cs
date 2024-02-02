using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase {

        #region variables

        private readonly IInvoiceReadRepository invoiceReadRepo;
        private readonly IInvoiceUpdateRepository invoiceUpdateRepo;
        private readonly IInvoiceValidation invoiceValidation;
        private readonly IMapper mapper;

        #endregion

        public InvoicesController(IMapper mapper, IInvoiceReadRepository invoiceReadRepo, IInvoiceUpdateRepository invoiceUpdateRepo, IInvoiceValidation invoiceValidation) {
            this.invoiceReadRepo = invoiceReadRepo;
            this.invoiceUpdateRepo = invoiceUpdateRepo;
            this.invoiceValidation = invoiceValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<InvoiceListVM>> GetAsync() {
            return await invoiceReadRepo.GetAsync();
        }

        [HttpGet("from/{from}/to/{to}")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<InvoiceListVM>> GetForPeriodAsync([FromRoute] string from, string to) {
            return await invoiceReadRepo.GetForPeriodAsync(from, to);
        }

        [HttpGet("{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string invoiceId) {
            var x = await invoiceReadRepo.GetByIdAsync(invoiceId, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Invoice, InvoiceReadDto>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost]
        [Authorize(Roles = "user, admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public ResponseWithBody Post([FromBody] InvoiceWriteDto invoice) {
            var x = invoiceUpdateRepo.Create(mapper.Map<InvoiceWriteDto, Invoice>((InvoiceWriteDto)invoiceUpdateRepo.AttachMetadataToPostDto(invoice)));
            return new ResponseWithBody {
                Code = 200,
                Icon = Icons.Success.ToString(),
                Body = x.PutAt,
                Message = ApiMessages.OK()
            };
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<ResponseWithBody> Put([FromBody] InvoiceWriteDto invoice) {
            var x = await invoiceReadRepo.GetByIdAsync(invoice.InvoiceId.ToString(), false);
            if (x != null) {
                var z = invoiceValidation.IsValidAsync(x, invoice);
                if (await z == 200) {
                    var withData = invoiceUpdateRepo.AttachMetadataToPutDto(x, invoice);
                    var mapped = mapper.Map<InvoiceWriteDto, Invoice>((InvoiceWriteDto)withData);
                    var i = invoiceUpdateRepo.Update(invoice.InvoiceId, mapped);
                    return new ResponseWithBody {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Body = i.PutAt,
                        Message = ApiMessages.OK()
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = await z
                    };
                }
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}