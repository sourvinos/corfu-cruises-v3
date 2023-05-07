using System;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Infrastructure.Settings {

    [Route("api/[controller]")]
    public class SettingsController : Controller {

        private readonly ISettingsRepository settingsRepo;

        public SettingsController(ISettingsRepository settingsRepo) {
            this.settingsRepo = settingsRepo;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<Setting> Get() {
            return await settingsRepo.GetAsync();
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] Setting setting) {
            var x = await settingsRepo.GetAsync();
            if (x != null) {
                setting.LastUpdate = DateHelpers.DateTimeToISOString(DateTime.Now);
                settingsRepo.Update((Setting)settingsRepo.AttachUserIdToDto(setting));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
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