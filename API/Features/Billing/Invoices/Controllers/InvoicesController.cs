using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml.Linq;
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

        private readonly IInvoiceAadeRepository invoiceAadeRepo;
        private readonly IInvoiceReadRepository invoiceReadRepo;
        private readonly IInvoiceUpdateRepository invoiceUpdateRepo;
        private readonly IInvoiceValidation invoiceValidation;
        private readonly IMapper mapper;

        #endregion

        public InvoicesController(IInvoiceAadeRepository invoiceAadeRepo, IMapper mapper, IInvoiceReadRepository invoiceReadRepo, IInvoiceUpdateRepository invoiceUpdateRepo, IInvoiceValidation invoiceValidation) {
            this.invoiceAadeRepo = invoiceAadeRepo;
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
        public ResponseWithBody Post([FromBody] InvoiceCreateDto invoice) {
            var x = invoiceUpdateRepo.Create(mapper.Map<InvoiceCreateDto, Invoice>((InvoiceCreateDto)invoiceUpdateRepo.AttachMetadataToPostDto(invoice)));
            return new ResponseWithBody {
                Code = 200,
                Icon = Icons.Success.ToString(),
                Body = mapper.Map<InvoiceCreateDto, InvoiceWriteResponseDto>(invoice),
                Message = ApiMessages.OK()
            };
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<ResponseWithBody> Put([FromBody] InvoiceUpdateDto invoice) {
            var x = await invoiceReadRepo.GetByIdAsync(invoice.InvoiceId.ToString(), false);
            if (x != null) {
                var z = invoiceValidation.IsValidAsync(x, invoice);
                if (await z == 200) {
                    var i = invoiceUpdateRepo.Update(invoice.InvoiceId, mapper.Map<InvoiceUpdateDto, Invoice>((InvoiceUpdateDto)invoiceUpdateRepo.AttachMetadataToPutDto(x, invoice)));
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

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Delete([FromRoute] string id) {
            var x = await invoiceReadRepo.GetByIdAsync(id, false);
            if (x != null) {
                invoiceUpdateRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = x.InvoiceId.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost("upload")]
        [Authorize(Roles = "admin")]
        public string Upload([FromBody] InvoiceVM invoice) {
            var response = invoiceAadeRepo.UploadXMLAsync(XElement.Load(invoiceAadeRepo.CreateXMLAsync(invoice))).Result;
            var prettyResponse = response.Replace("&lt;", "<").Replace("&gt;", ">");
            invoiceAadeRepo.SaveResponse(invoice, prettyResponse);
            return prettyResponse;
        }

    }

}