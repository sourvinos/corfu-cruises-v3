using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.Nationalities {

    [Route("api/[controller]")]
    public class NationalitiesController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly INationalityRepository nationalityRepo;

        #endregion

        public NationalitiesController(IMapper mapper, INationalityRepository nationalityRepo) {
            this.mapper = mapper;
            this.nationalityRepo = nationalityRepo;
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<NationalityBrowserVM>> GetForBrowserAsync() {
            return await nationalityRepo.GetForBrowserAsync();
        }

    }

}