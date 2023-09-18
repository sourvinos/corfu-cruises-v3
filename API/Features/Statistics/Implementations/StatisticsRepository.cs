using System;
using System.Collections.Generic;
using System.Linq;
using API.Features.Reservations;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Statistics {

    public class StatisticsRepository : Repository<Reservation>, IStatisticsRepository {


        public StatisticsRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
        }

        public IEnumerable<StatisticsVM> Get(int year) {
            return context.Reservations
                .AsNoTracking()
                .Include(x => x.Passengers)
                .Where(x => x.Date >= new DateTime(year, 1, 1) && x.Date <= new DateTime(year, DateHelpers.GetLocalDateTime().Month, DateHelpers.GetLocalDateTime().Day))
                .GroupBy(x => new { x.Date.Year })
                .Select(x => new StatisticsVM {
                    Year = x.Key.Year,
                    Pax = x.Sum(x => x.TotalPax),
                    ActualPax = x.Sum(x => x.Passengers.Where(x => x.IsBoarded == true).Count()),
                });
        }

        public IEnumerable<StatisticsVM> GetPerDestination(int year) {
            return context.Reservations
                .AsNoTracking()
                .Include(x => x.Passengers)
                .Where(x => x.Date >= new DateTime(year, 1, 1) && x.Date <= new DateTime(year, DateHelpers.GetLocalDateTime().Month, DateHelpers.GetLocalDateTime().Day))
                .GroupBy(x => new { x.Date.Year, x.Destination.Id, x.Destination.Description })
                .Select(x => new StatisticsVM {
                    Year = x.Key.Year,
                    Id = x.Key.Id,
                    Description = x.Key.Description,
                    Pax = x.Sum(x => x.TotalPax),
                    ActualPax = x.Sum(x => x.Passengers.Where(x => x.IsBoarded == true).Count()),
                });
        }

        public IEnumerable<StatisticsVM> GetPerPort(int year) {
            return context.Reservations
                .AsNoTracking()
                .Include(x => x.Passengers)
                .Where(x => x.Date >= new DateTime(year, 1, 1) && x.Date <= new DateTime(year, DateHelpers.GetLocalDateTime().Month, DateHelpers.GetLocalDateTime().Day))
                .GroupBy(x => new { x.Date.Year, x.Port.Id, x.Port.Description })
                .Select(x => new StatisticsVM {
                    Year = x.Key.Year,
                    Id = x.Key.Id,
                    Description = x.Key.Description,
                    Pax = x.Sum(x => x.TotalPax),
                    ActualPax = x.Sum(x => x.Passengers.Where(x => x.IsBoarded == true).Count()),
                });
        }

        public IEnumerable<StatisticsVM> GetPerShip(int year) {
            return context.Reservations
                .AsNoTracking()
                .Include(x => x.Passengers)
                .Where(x => x.Date >= new DateTime(year, 1, 1) && x.Date <= new DateTime(year, DateHelpers.GetLocalDateTime().Month, DateHelpers.GetLocalDateTime().Day) && x.ShipId != null)
                .GroupBy(x => new { x.Date.Year, x.Ship.Id, x.Ship.Description })
                .Select(x => new StatisticsVM {
                    Year = x.Key.Year,
                    Id = x.Key.Id,
                    Description = x.Key.Description,
                    Pax = x.Sum(x => x.TotalPax),
                    ActualPax = x.Sum(x => x.Passengers.Where(x => x.IsBoarded == true).Count()),
                });
        }

        public IEnumerable<StatisticsVM> GetPerDriver(int year) {
            return context.Reservations
                .AsNoTracking()
                .Include(x => x.Passengers)
                .Where(x => x.Date >= new DateTime(year, 1, 1) && x.Date <= new DateTime(year, DateHelpers.GetLocalDateTime().Month, DateHelpers.GetLocalDateTime().Day) && x.DriverId != null)
                .GroupBy(x => new { x.Date.Year, x.Driver.Id, x.Driver.Description })
                .Select(x => new StatisticsVM {
                    Year = x.Key.Year,
                    Id = x.Key.Id,
                    Description = x.Key.Description,
                    Pax = x.Sum(x => x.TotalPax),
                    ActualPax = x.Sum(x => x.Passengers.Where(x => x.IsBoarded == true).Count()),
                });
        }

        public IEnumerable<StatisticsVM> GetPerCustomer(int year) {
            return context.Reservations
                .AsNoTracking()
                .Include(x => x.Passengers)
                .Where(x => x.Date >= new DateTime(year, 1, 1) && x.Date <= new DateTime(year, DateHelpers.GetLocalDateTime().Month, DateHelpers.GetLocalDateTime().Day))
                .GroupBy(x => new { x.Date.Year, x.Customer.Id, x.Customer.Description })
                .Select(x => new StatisticsVM {
                    Year = x.Key.Year,
                    Id = x.Key.Id,
                    Description = x.Key.Description,
                    Pax = x.Sum(x => x.TotalPax),
                    ActualPax = x.Sum(x => x.Passengers.Where(x => x.IsBoarded == true).Count()),
                });
        }

    }

}