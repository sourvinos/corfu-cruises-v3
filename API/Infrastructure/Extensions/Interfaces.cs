using API.Features.Billing.DocumentTypes;
using API.Features.Billing.Invoices;
using API.Features.Billing.Ledgers;
using API.Features.Billing.Parameters;
using API.Features.Billing.PaymentMethods;
using API.Features.Billing.Prices;
using API.Features.Billing.Receipts;
using API.Features.Billing.TaxOffices;
using API.Features.Billing.VatRegimes;
using API.Features.Reservations.Availability;
using API.Features.Reservations.Boarding;
using API.Features.Reservations.CoachRoutes;
using API.Features.Reservations.CrewSpecialties;
using API.Features.Reservations.Customers;
using API.Features.Reservations.Destinations;
using API.Features.Reservations.Drivers;
using API.Features.Reservations.Genders;
using API.Features.Reservations.IdentityDocuments;
using API.Features.Reservations.Ledgers;
using API.Features.Reservations.Manifest;
using API.Features.Reservations.Nationalities;
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
using API.Features.Reservations.Statistics;
using API.Infrastructure.Auth;
using API.Infrastructure.Users;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class Interfaces {

        public static void AddInterfaces(IServiceCollection services) {
            services.AddScoped<Token>();
            #region reservations
            // Tables
            services.AddTransient<ICoachRouteRepository, CoachRouteRepository>();
            services.AddTransient<ICrewSpecialtyRepository, CrewSpecialtyRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IDestinationRepository, DestinationRepository>();
            services.AddTransient<IDriverRepository, DriverRepository>();
            services.AddTransient<IGenderRepository, GenderRepository>();
            services.AddTransient<IGenderRepository, GenderRepository>();
            services.AddTransient<IIdentityDocumentRepository, IdentityDocumentRepository>();
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
            services.AddTransient<ICrewSpecialtyValidation, CrewSpecialtyValidation>();
            services.AddTransient<ICustomerValidation, CustomerValidation>();
            services.AddTransient<IDestinationValidation, DestinationValidation>();
            services.AddTransient<IDriverValidation, DriverValidation>();
            services.AddTransient<IGenderValidation, GenderValidation>();
            services.AddTransient<IIdentityDocumentValidation, IdentityDocumentValidation>();
            services.AddTransient<INationalityValidation, NationalityValidation>();
            services.AddTransient<IPickupPointValidation, PickupPointValidation>();
            services.AddTransient<IPortValidation, PortValidation>();
            services.AddTransient<IRegistrarValidation, RegistrarValidation>();
            services.AddTransient<IReservationParameterValidation, ParameterValidation>();
            services.AddTransient<IReservationParametersRepository, ParametersRepository>();
            services.AddTransient<IReservationValidation, ReservationValidation>();
            services.AddTransient<IScheduleValidation, ScheduleValidation>();
            services.AddTransient<IShipCrewValidation, ShipCrewValidation>();
            services.AddTransient<IShipOwnerValidation, ShipOwnerValidation>();
            services.AddTransient<IShipRouteValidation, ShipRouteValidation>();
            services.AddTransient<IShipValidation, ShipValidation>();
            services.AddTransient<IStatisticsRepository, StatisticsRepository>();
            services.AddTransient<IUserValidation<IUser>, UserValidation>();
            #endregion
            #region billing
            services.AddTransient<IBillingParameterValidation, BillingParameterValidation>();
            services.AddTransient<IBillingParametersRepository, BillingParametersRepository>();
            services.AddTransient<IDocumentTypeRepository, DocumentTypeRepository>();
            services.AddTransient<IDocumentTypeValidation, DocumentTypeValidation>();
            services.AddTransient<IInvoiceAadeRepository, InvoiceAadeRepository>();
            services.AddTransient<IInvoiceCalculateBalanceRepo, InvoiceCalculateBalanceRepo>();
            services.AddTransient<IInvoiceReadRepository, InvoiceReadRepository>();
            services.AddTransient<IInvoiceSendToEmail, InvoiceSendToEmail>();
            services.AddTransient<IInvoiceUpdateRepository, InvoiceUpdateRepository>();
            services.AddTransient<IInvoiceValidation, InvoiceValidation>();
            services.AddTransient<ILedgerBillingRepository, LedgerBillingRepository>();
            services.AddTransient<IPaymentMethodRepository, PaymentMethodRepository>();
            services.AddTransient<IPaymentMethodValidation, PaymentMethodValidation>();
            services.AddTransient<IPriceCloneRepository, PriceCloneRepository>();
            services.AddTransient<IPriceRepository, PriceRepository>();
            services.AddTransient<IPriceValidation, PriceValidation>();
            services.AddTransient<IReceiptRepository, ReceiptRepository>();
            services.AddTransient<IReceiptValidation, ReceiptValidation>();
            services.AddTransient<ITaxOfficeRepository, TaxOfficeRepository>();
            services.AddTransient<ITaxOfficeValidation, TaxOfficeValidation>();
            services.AddTransient<IVatRegimeRepository, VatRegimeRepository>();
            services.AddTransient<IVatRegimeValidation, VatRegimeValidation>();
            services.AddTransient<IVatRegimeValidation, VatRegimeValidation>();
            #endregion
            #region common
            services.AddTransient<IEmailSender, EmailSender>();
            #endregion
        }

    }

}

