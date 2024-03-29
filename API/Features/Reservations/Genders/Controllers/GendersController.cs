using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.Genders {

    [Route("api/[controller]")]
    public class GendersController : ControllerBase {

        #region variables

        private readonly IGenderRepository genderRepo;
        private readonly IMapper mapper;

        #endregion

        public GendersController(IGenderRepository genderRepo, IMapper mapper) {
            this.genderRepo = genderRepo;
            this.mapper = mapper;
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "user, admin")]
        public async Task<IEnumerable<GenderBrowserVM>> GetForBrowserAsync() {
            return await genderRepo.GetForBrowserAsync();
        }

    }

}