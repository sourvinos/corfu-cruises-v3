using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Statistics {

    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IStatisticsRepository statisticsRepo;

        #endregion

        public StatisticsController(IMapper mapper, IStatisticsRepository statisticsRepo) {
            this.mapper = mapper;
            this.statisticsRepo = statisticsRepo;
        }

        [HttpGet("ytd/year/{year}")]
        [Authorize(Roles = "admin")]
        public IEnumerable<StatisticsVM> Get([FromRoute] int year) {
            return statisticsRepo.Get(year);
        }

        [HttpGet("destinations/year/{year}")]
        [Authorize(Roles = "admin")]
        public IEnumerable<StatisticsVM> GetPerDestination([FromRoute] int year) {
            return statisticsRepo.GetPerDestination(year);
        }

    }

}