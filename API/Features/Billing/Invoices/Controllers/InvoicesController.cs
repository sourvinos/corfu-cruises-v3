using API.Features.Reservations.Customers;
using API.Infrastructure.Classes;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase {

        #region variables

        private readonly EnvironmentSettings environmentSettings;
        private readonly ICustomerRepository customerRepo;
        private readonly IInvoiceCalculateBalanceRepo invoiceCalculateBalanceRepo;
        private readonly IInvoicePdfRepository invoicePdfRepo;
        private readonly IInvoiceReadRepository invoiceReadRepo;
        private readonly IInvoiceSendToEmail invoiceSendToEmail;
        private readonly IInvoiceUpdateRepository invoiceUpdateRepo;
        private readonly IInvoiceValidation invoiceValidation;
        private readonly IMapper mapper;

        #endregion

        public InvoicesController(ICustomerRepository customerRepo, IInvoiceCalculateBalanceRepo invoiceCalculateBalance, IInvoicePdfRepository invoicePdfRepo, IInvoiceReadRepository invoiceReadRepo, IInvoiceSendToEmail invoiceSendToEmail, IInvoiceUpdateRepository invoiceUpdateRepo, IInvoiceValidation invoiceValidation, IMapper mapper, IOptions<EnvironmentSettings> environmentSettings) {
            this.customerRepo = customerRepo;
            this.environmentSettings = environmentSettings.Value;
            this.invoiceCalculateBalanceRepo = invoiceCalculateBalance;
            this.invoiceReadRepo = invoiceReadRepo;
            this.invoiceSendToEmail = invoiceSendToEmail;
            this.invoiceUpdateRepo = invoiceUpdateRepo;
            this.invoicePdfRepo = invoicePdfRepo;
            this.invoiceValidation = invoiceValidation;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<InvoiceListVM>> GetAsync() {
            return await invoiceReadRepo.GetAsync();
        }

        [HttpPost("{getForPeriod}")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<InvoiceListVM>> GetForPeriodAsync([FromBody] InvoiceListCriteriaVM criteria) {
            return await invoiceReadRepo.GetForPeriodAsync(criteria);
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
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PostAsync([FromBody] InvoiceCreateDto invoice) {
            var x = invoiceValidation.IsValidAsync(null, invoice);
            if (await x == 200) {
                invoice.ShipOwnerId = await invoiceUpdateRepo.AttachShipOwnerIdToInvoiceAsync(invoice);
                invoice = invoiceCalculateBalanceRepo.AttachBalancesToCreateDto(invoice, invoiceCalculateBalanceRepo.CalculateBalances(invoice, invoice.CustomerId));
                var z = invoiceUpdateRepo.Create(mapper.Map<InvoiceCreateDto, Invoice>((InvoiceCreateDto)invoiceUpdateRepo.AttachMetadataToPostDto(invoice)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = z.InvoiceId.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = await x
                };
            }
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> PutAsync([FromBody] InvoiceUpdateDto invoice) {
            var x = await invoiceReadRepo.GetByIdAsync(invoice.InvoiceId.ToString(), false);
            if (x != null) {
                var z = invoiceValidation.IsValidAsync(x, invoice);
                if (await z == 200) {
                    var i = invoiceUpdateRepo.Update(invoice.InvoiceId, mapper.Map<InvoiceUpdateDto, Invoice>((InvoiceUpdateDto)invoiceUpdateRepo.AttachMetadataToPutDto(x, invoice)));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = i.InvoiceId.ToString(),
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

        [HttpDelete("{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Delete([FromRoute] string invoiceId) {
            var x = await invoiceReadRepo.GetByIdAsync(invoiceId, false);
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

        [HttpGet("validateBalance/{customerId}")]
        [Authorize(Roles = "user, admin")]
        public async Task<ResponseWithBody> ValidateBalance(int customerId) {
            var x = await customerRepo.GetByIdAsync(customerId, false);
            if (x != null) {
                var balanceLimit = x.BalanceLimit;
                var balance = invoiceCalculateBalanceRepo.CalculatePreviousBalance(customerId);
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Body = new InvoiceValidateBalanceVM {
                        Customer = new SimpleEntity { Id = x.Id, Description = x.Description },
                        BalanceLimit = balanceLimit,
                        ActualBalance = balance,
                        MaxAllowed = balanceLimit - balance
                    },
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPut("invoiceAade")]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] InvoiceAade invoiceAade) {
            var x = await invoiceReadRepo.GetInvoiceAadeByIdAsync(invoiceAade.InvoiceId.ToString());
            if (x != null) {
                invoiceUpdateRepo.UpdateInvoiceAade(invoiceAade);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = invoiceAade.InvoiceId.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost("sendInvoiceLinkToEmail")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Post([FromBody] InvoiceLinkVM invoiceLink) {
            string baseUrl = environmentSettings.BaseUrl;
            string returnUrl = Url.Content($"{baseUrl}#/invoicesViewer/{invoiceLink.InvoiceId}");
            var response = invoiceSendToEmail.SendInvoiceLinkToEmail(invoiceLink, returnUrl);
            if (response.Exception == null) {
                return await Task.FromResult(new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Message = ApiMessages.OK()
                });
            } else {
                return await Task.FromResult(new Response {
                    Code = 498,
                    Icon = Icons.Error.ToString(),
                    Id = null,
                    Message = response.Exception.Message
                });
            }
        }

        [HttpPost("buildInvoicePdf/{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> BuildPdf(string invoiceId) {
            var x = await invoiceReadRepo.GetByIdForPdfAsync(invoiceId);
            if (x != null) {
                var filename = invoicePdfRepo.BuildPdf(mapper.Map<Invoice, InvoicePdfVM>(x));
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = filename
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPatch("email/{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> PatchEmail(string invoiceId) {
            var x = await invoiceReadRepo.GetByIdAsync(invoiceId, false);
            if (x != null) {
                invoiceUpdateRepo.UpdateIsEmailSent(x, invoiceId);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = invoiceId.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPatch("isCancelled/{invoiceId}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> PatchIsCancelled(string invoiceId) {
            var x = await invoiceReadRepo.GetByIdAsync(invoiceId, false);
            if (x != null) {
                invoiceUpdateRepo.UpdateIsCancelled(x, invoiceId);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = invoiceId.ToString(),
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