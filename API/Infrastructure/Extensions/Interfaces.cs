using API.Features.Availability;
using API.Features.Boarding;
using API.Features.CoachRoutes;
using API.Features.Codes;
using API.Features.Customers;
using API.Features.Destinations;
using API.Features.Drivers;
using API.Features.Genders;
using API.Features.Ledger;
using API.Features.Manifest;
using API.Features.Nationalities;
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
using API.Features.Statistics;
using API.Features.TaxOffices;
using API.Features.Users;
using API.Features.VatRegimes;
using API.Infrastructure.Auth;
using API.Infrastructure.Parameters;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class Interfaces {

        public static void AddInterfaces(IServiceCollection services) {
            services.AddScoped<Token>();
            #region reservations
            // Tables
            services.AddTransient<ICoachRouteRepository, CoachRouteRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IDestinationRepository, DestinationRepository>();
            services.AddTransient<IDriverRepository, DriverRepository>();
            services.AddTransient<IGenderRepository, GenderRepository>();
            services.AddTransient<IGenderRepository, GenderRepository>();
            services.AddTransient<INationalityRepository, NationalityRepository>();
            services.AddTransient<IPickupPointRepository, PickupPointRepository>();
            services.AddTransient<IPortRepository, PortRepository>();
            services.AddTransient<IRegistrarRepository, RegistrarRepository>();
            services.AddTransient<IScheduleRepository, ScheduleRepository>();
            services.AddTransient<IShipCrewRepository, ShipCrewRepository>();
            services.AddTransient<IShipOwnerRepository, ShipOwnerRepository>();
            services.AddTransient<IShipRepository, ShipRepository>();
            services.AddTransient<IShipRouteRepository, ShipRouteRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            // Tasks
            services.AddTransient<IBoardingRepository, BoardingRepository>();
            services.AddTransient<ILedgerRepository, LedgerRepository>();
            services.AddTransient<IManifestRepository, ManifestRepository>();
            // Reservations - Availability
            services.AddTransient<IReservationCalendar, ReservationCalendar>();
            services.AddTransient<IReservationReadRepository, ReservationReadRepository>();
            services.AddTransient<IReservationUpdateRepository, ReservationUpdateRepository>();
            services.AddTransient<IAvailabilityCalendar, AvailabilityCalendar>();
            services.AddTransient<IReservationSendToEmail, ReservationSendToEmail>();
            // Validations
            services.AddTransient<ICoachRouteValidation, CoachRouteValidation>();
            services.AddTransient<ICustomerValidation, CustomerValidation>();
            services.AddTransient<IDestinationValidation, DestinationValidation>();
            services.AddTransient<IDriverValidation, DriverValidation>();
            services.AddTransient<IGenderValidation, GenderValidation>();
            services.AddTransient<INationalityValidation, NationalityValidation>();
            services.AddTransient<IPickupPointValidation, PickupPointValidation>();
            services.AddTransient<IPortValidation, PortValidation>();
            services.AddTransient<IRegistrarValidation, RegistrarValidation>();
            services.AddTransient<IReservationValidation, ReservationValidation>();
            services.AddTransient<IScheduleValidation, ScheduleValidation>();
            services.AddTransient<IParameterValidation, ParameterValidation>();
            services.AddTransient<IShipCrewValidation, ShipCrewValidation>();
            services.AddTransient<IShipOwnerValidation, ShipOwnerValidation>();
            services.AddTransient<IShipRouteValidation, ShipRouteValidation>();
            services.AddTransient<IShipValidation, ShipValidation>();
            services.AddTransient<IUserValidation<IUser>, UserValidation>();
            services.AddTransient<IParametersRepository, ParametersRepository>();
            services.AddTransient<IStatisticsRepository, StatisticsRepository>();
            #endregion
            #region billing
            services.AddTransient<ICodeRepository, CodeRepository>();
            services.AddTransient<ICodeValidation, CodeValidation>();
            services.AddTransient<IPaymentMethodRepository, PaymentMethodRepository>();
            services.AddTransient<IPaymentMethodValidation, PaymentMethodValidation>();
            services.AddTransient<IPriceCloneRepository, PriceCloneRepository>();
            services.AddTransient<IPriceRepository, PriceRepository>();
            services.AddTransient<IPriceValidation, PriceValidation>();
            services.AddTransient<ITaxOfficeRepository, TaxOfficeRepository>();
            services.AddTransient<ITaxOfficeValidation, TaxOfficeValidation>();
            services.AddTransient<IVatRegimeRepository, VatRegimeRepository>();
            services.AddTransient<IVatRegimeValidation, VatRegimeValidation>();
            #endregion
            #region common
            services.AddTransient<IEmailSender, EmailSender>();
            #endregion
        }

    }

}

