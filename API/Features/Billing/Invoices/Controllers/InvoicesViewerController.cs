using System.Threading.Tasks;
using API.Features.Reservations.Customers;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesViewerController : ControllerBase {

        #region variables

        private readonly ICustomerRepository customerRepo;
        private readonly IInvoiceReadRepository invoiceReadRepo;
        private readonly IMapper mapper;

        #endregion

        public InvoicesViewerController(ICustomerRepository customerRepo, IMapper mapper, IInvoiceReadRepository invoiceReadRepo) {
            this.customerRepo = customerRepo;
            this.invoiceReadRepo = invoiceReadRepo;
            this.mapper = mapper;
        }

        [HttpGet("invoice/{invoiceId}")]
        public async Task<ResponseWithBody> GetByIdAsync(string invoiceId) {
            var x = await invoiceReadRepo.GetForViewerByIdAsync(invoiceId);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Invoice, InvoiceViewerVM>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpGet("customer/{customerId}")]
        public async Task<ResponseWithBody> Get(int customerId) {
            var x = await customerRepo.GetByIdAsync(customerId, false);
            if (x != null) {
                var balanceVM = invoiceReadRepo.BuildBalanceForInvoice(invoiceReadRepo.GetForInvoice(customerId));
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = new InvoiceViewerCustomerBalanceVM {
                        Id = x.Id,
                        Description = x.Description,
                        Balance = balanceVM
                    }
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}