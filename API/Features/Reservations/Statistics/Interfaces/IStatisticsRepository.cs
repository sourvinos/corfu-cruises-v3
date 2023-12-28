using System.Collections.Generic;
using API.Features.Reservations;
using API.Infrastructure.Interfaces;

namespace API.Features.Statistics {

    public interface IStatisticsRepository : IRepository<Reservation> {

        IEnumerable<StatisticsVM> Get(int year);
        IEnumerable<StatisticsVM> GetPerDestination(int year);
        IEnumerable<StatisticsVM> GetPerPort(int year);
        IEnumerable<StatisticsVM> GetPerShip(int year);
        IEnumerable<StatisticsVM> GetPerDriver(int year);
        IEnumerable<StatisticsVM> GetPerCustomer(int year);
        IEnumerable<StatisticsUserVM> GetPerUser(int year);
        IEnumerable<StatisticsNationalityVM> GetPerNationality(int year);

    }

}