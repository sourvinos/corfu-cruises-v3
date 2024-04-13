using System.Threading.Tasks;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Billing.Receipts {

    [Route("api/[controller]")]
    public class ReceiptsViewerController : ControllerBase {

        #region variables

        private readonly IReceiptRepository receiptReadRepo;
        private readonly IMapper mapper;

        #endregion

        public ReceiptsViewerController(IMapper mapper, IReceiptRepository receiptReadRepo) {
            this.receiptReadRepo = receiptReadRepo;
            this.mapper = mapper;
        }

        [HttpGet("{invoiceId}")]
        public async Task<ResponseWithBody> GetByIdAsync(string invoiceId) {
            var x = await receiptReadRepo.GetForViewerByIdAsync(invoiceId);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Receipt, ReceiptViewerVM>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}