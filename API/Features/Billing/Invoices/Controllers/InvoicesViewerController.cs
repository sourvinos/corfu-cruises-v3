using System.Threading.Tasks;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Invoices {

    [Route("api/[controller]")]
    public class InvoicesViewerController : ControllerBase {

        #region variables

        private readonly IInvoiceReadRepository invoiceReadRepo;
        private readonly IMapper mapper;

        #endregion

        public InvoicesViewerController(IMapper mapper, IInvoiceReadRepository invoiceReadRepo) {
            this.invoiceReadRepo = invoiceReadRepo;
            this.mapper = mapper;
        }

        [HttpGet("{invoiceId}")]
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

    }

}