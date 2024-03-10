using API.Features.Billing.DocumentTypes;
using API.Features.Billing.Invoices;
using API.Features.Billing.Parameters;
using API.Features.Billing.PaymentMethods;
using API.Features.Billing.Prices;
using API.Features.Billing.Receipts;
using API.Features.Billing.TaxOffices;
using API.Features.Billing.Transactions;
using API.Features.Billing.VatRegimes;
using API.Features.Reservations.CoachRoutes;
using API.Features.Reservations.CrewSpecialties;
using API.Features.Reservations.Customers;
using API.Features.Reservations.Destinations;
using API.Features.Reservations.Drivers;
using API.Features.Reservations.Genders;
using API.Features.Reservations.IdentityDocuments;
using API.Features.Reservations.Nationalities;
using API.Features.Reservations.Occupants;
using API.Features.Reservations.Parameters;
using API.Features.Reservations.PickupPoints;
using API.Features.Reservations.Ports;
using API.Features.Reservations.Registrars;
using API.Features.Reservations.Reservations;
using API.Features.Reservations.Schedules;
using API.Features.Reservations.ShipCrews;
using API.Features.Reservations.ShipOwners;
using API.Features.Reservations.ShipRoutes;
using API.Features.Reservations.Ships;
using API.Infrastructure.Auth;
using API.Infrastructure.Users;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Classes {

    public class AppDbContext : IdentityDbContext<IdentityUser> {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        #region DbSets - Reservations

        public DbSet<CoachRoute> CoachRoutes { get; set; }
        public DbSet<CrewSpecialty> CrewSpecialties { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<IdentityDocument> IdentityDocuments { get; set; }
        public DbSet<Nationality> Nationalities { get; set; }
        public DbSet<Occupant> Occupants { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<PickupPoint> PickupPoints { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<Registrar> Registrars { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationParameter> ReservationParameters { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Ship> Ships { get; set; }
        public DbSet<ShipCrew> ShipCrews { get; set; }
        public DbSet<ShipOwner> ShipOwners { get; set; }
        public DbSet<ShipRoute> ShipRoutes { get; set; }

        #endregion

        #region DbSets - Billing

        public DbSet<BillingParameter> BillingParameters { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }
        public DbSet<InvoiceAade> InvoicesAade { get; set; }
        public DbSet<InvoicePort> InvoicesPorts { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<TaxOffice> TaxOffices { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<VatRegime> VatRegimes { get; set; }

        #endregion

        #region DbSets - Common

        public DbSet<Token> Tokens { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            ApplyConfigurations(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        private static void ApplyConfigurations(ModelBuilder modelBuilder) {
            #region reservations
            modelBuilder.ApplyConfiguration(new CoachRoutesConfig());
            modelBuilder.ApplyConfiguration(new CrewSpecialtiesConfig());
            modelBuilder.ApplyConfiguration(new CustomersConfig());
            modelBuilder.ApplyConfiguration(new DestinationsConfig());
            modelBuilder.ApplyConfiguration(new DriversConfig());
            modelBuilder.ApplyConfiguration(new GendersConfig());
            modelBuilder.ApplyConfiguration(new IdentityDocumentsConfig());
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
            modelBuilder.ApplyConfiguration(new TransactionConfig());
            modelBuilder.ApplyConfiguration(new DocumentTypeConfig());
            modelBuilder.ApplyConfiguration(new InvoicesAadeConfig());
            modelBuilder.ApplyConfiguration(new InvoicesConfig());
            modelBuilder.ApplyConfiguration(new InvoicesPortsConfig());
            modelBuilder.ApplyConfiguration(new ParametersConfig());
            modelBuilder.ApplyConfiguration(new PaymentMethodsConfig());
            modelBuilder.ApplyConfiguration(new PricesConfig());
            modelBuilder.ApplyConfiguration(new TaxOfficesConfig());
            modelBuilder.ApplyConfiguration(new ReceiptsConfig());
            modelBuilder.ApplyConfiguration(new VatRegimeConfig());
            #endregion
            #region common
            modelBuilder.ApplyConfiguration(new UsersConfig());
            #endregion
        }

    }

}