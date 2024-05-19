using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Features.Billing.Retail {

    [Route("api/[controller]")]
    public class RetailsController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IRetailReadRepository retailReadRepo;
        private readonly IRetailUpdateRepository retailUpdateRepo;
        private readonly IRetailValidation retailValidation;

        #endregion

        public RetailsController(IMapper mapper, IRetailReadRepository retailReadRepo, IRetailUpdateRepository retailUpdateRepo, IRetailValidation retailValidation) {
            this.mapper = mapper;
            this.retailReadRepo = retailReadRepo;
            this.retailUpdateRepo = retailUpdateRepo;
            this.retailValidation = retailValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<RetailListVM>> GetAsync() {
            return await retailReadRepo.GetAsync();
        }

        [HttpPost("{getForPeriod}")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<RetailListVM>> GetForPeriodAsync([FromBody] RetailListCriteriaVM criteria) {
            return await retailReadRepo.GetForPeriodAsync(criteria);
        }

        [HttpGet("{retaiId}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(string retaiId) {
            var x = await retailReadRepo.GetByIdAsync(retaiId, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Retail, RetailReadDto>(x)
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
        public async Task<Response> PostAsync([FromBody] RetailCreateDto retail) {
            retail.InvoiceNo = await retailUpdateRepo.IncreaseRetailNoAsync(retail);
            var x = retailValidation.IsValidAsync(null, retail);
            if (await x == 200) {
                var z = retailUpdateRepo.Create(mapper.Map<RetailCreateDto, Retail>((RetailCreateDto)retailUpdateRepo.AttachMetadataToPostDto(retail)));
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
        public async Task<Response> PutAsync([FromBody] RetailUpdateDto retail) {
            var x = await retailReadRepo.GetByIdAsync(retail.InvoiceId.ToString(), false);
            if (x != null) {
                var z = retailValidation.IsValidAsync(x, retail);
                if (await z == 200) {
                    var i = retailUpdateRepo.Update(retail.InvoiceId, mapper.Map<RetailUpdateDto, Retail>((RetailUpdateDto)retailUpdateRepo.AttachMetadataToPutDto(x, retail)));
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

        [HttpPut("retaiAade")]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] RetailAade retaiAade) {
            var x = await retailReadRepo.GetInvoiceAadeByIdAsync(retaiAade.InvoiceId.ToString());
            if (x != null) {
                retailUpdateRepo.UpdateRetailAade(retaiAade);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = retaiAade.InvoiceId.ToString(),
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