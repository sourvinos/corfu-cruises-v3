using System;
using System.Collections.Generic;
using System.Linq;
using API.Features.Reservations;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Statistics {

    public class StatisticsRepository : Repository<Reservation>, IStatisticsRepository {

        private readonly IMapper mapper;

        public StatisticsRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public IEnumerable<StatisticsVM> Get(int year) {
            return context.Reservations
                .AsNoTracking()
                .Include(x => x.Passengers)
                .Where(x => x.Date.Year == year)
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
                .Where(x => x.Date.Year == year)
                .GroupBy(x => new { x.Date.Year, x.Destination.Id, x.Destination.Description })
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