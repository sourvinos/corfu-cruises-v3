using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.Customers {

    [Route("api/[controller]")]
    public class CustomersAadeController : ControllerBase {

        #region variables

        private readonly ICustomerAadeRepository repo;

        #endregion

        public CustomersAadeController(ICustomerAadeRepository repo) {
            this.repo = repo;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public Response GetAsync() {
            var x = repo.GetAsync();
            if (x != null) {
                return new Response {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Id = null,
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