using System.Collections.Generic;
using API.Features.Reservations;
using API.Infrastructure.Interfaces;

namespace API.Features.Statistics {

    public interface IStatisticsRepository : IRepository<Reservation> {

        IEnumerable<StatisticsVM> Get(int year);
        IEnumerable<StatisticsVM> GetPerDestination(int year);

    }

}