using API.Features.CoachRoutes;
using API.Features.Customers;
using API.Features.Destinations;
using API.Features.Drivers;
using API.Features.Genders;
using API.Features.Nationalities;
using API.Features.Occupants;
using API.Features.PaymentMethods;
using API.Features.PickupPoints;
using API.Features.Ports;
using API.Features.Prices;
using API.Features.Registrars;
using API.Features.Reservations;
using API.Features.Schedules;
using API.Features.ShipCrews;
using API.Features.ShipOwners;
using API.Features.ShipRoutes;
using API.Features.Ships;
using API.Features.TaxOffices;
using API.Features.Users;
using API.Features.VatRegimes;
using API.Infrastructure.Auth;
using API.Infrastructure.Parameters;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Classes {

    public class AppDbContext : IdentityDbContext<IdentityUser> {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        #region DbSets - Reservations

        public DbSet<CoachRoute> CoachRoutes { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<Nationality> Nationalities { get; set; }
        public DbSet<Occupant> Occupants { get; set; }
        public DbSet<Parameter> Parameters { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<PickupPoint> PickupPoints { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<Registrar> Registrars { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Ship> Ships { get; set; }
        public DbSet<ShipCrew> ShipCrews { get; set; }
        public DbSet<ShipOwner> ShipOwners { get; set; }
        public DbSet<ShipRoute> ShipRoutes { get; set; }
        public DbSet<Token> Tokens { get; set; }

        #endregion

        #region DbSets - Billing

        public DbSet<Price> Prices { get; set; }
        public DbSet<TaxOffice> TaxOffices { get; set; }
        public DbSet<VatRegime> VatRegimes { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            ApplyConfigurations(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        private static void ApplyConfigurations(ModelBuilder modelBuilder) {
            #region reservations
            modelBuilder.ApplyConfiguration(new CoachRoutesConfig());
            modelBuilder.ApplyConfiguration(new CustomersConfig());
            modelBuilder.ApplyConfiguration(new DestinationsConfig());
            modelBuilder.ApplyConfiguration(new DriversConfig());
            modelBuilder.ApplyConfiguration(new GendersConfig());
            modelBuilder.ApplyConfiguration(new NationalitiesConfig());
            modelBuilder.ApplyConfiguration(new ParametersConfig());
            modelBuilder.ApplyConfiguration(new PassengersConfig());
            modelBuilder.ApplyConfiguration(new PickupPointsConfig());
            modelBuilder.ApplyConfiguration(new PortsConfig());
            modelBuilder.ApplyConfiguration(new RegistrarsConfig());
            modelBuilder.ApplyConfiguration(new ReservationsConfig());
            modelBuilder.ApplyConfiguration(new ReservationsConfig());
            modelBuilder.ApplyConfiguration(new SchedulesConfig());
            modelBuilder.ApplyConfiguration(new ShipCrewsConfig());
            modelBuilder.ApplyConfiguration(new ShipOwnersConfig());
            modelBuilder.ApplyConfiguration(new ShipRoutesConfig());
            modelBuilder.ApplyConfiguration(new ShipsConfig());
            #endregion
            #region billing
            modelBuilder.ApplyConfiguration(new PaymentMethodsConfig());
            modelBuilder.ApplyConfiguration(new PricesConfig());
            modelBuilder.ApplyConfiguration(new TaxOfficesConfig());
            modelBuilder.ApplyConfiguration(new VatRegimeConfig());
            #endregion
            #region common
            modelBuilder.ApplyConfiguration(new UsersConfig());
            #endregion
        }

    }

}