using API.Features.Billing.BankAccounts;
using API.Features.Billing.Banks;
using API.Features.Billing.DocumentTypes;
using API.Features.Billing.Invoices;
using API.Features.Billing.Ledgers;
using API.Features.Billing.PaymentMethods;
using API.Features.Billing.Prices;
using API.Features.Billing.Receipts;
using API.Features.Billing.Retail;
using API.Features.Billing.TaxOffices;
using API.Features.Billing.VatRegimes;
using API.Features.CheckIn;
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
using API.Features.Reservations.Reservations;
using API.Features.Reservations.Schedules;
using API.Features.Reservations.ShipCrews;
using API.Features.Reservations.ShipOwners;
using API.Features.Reservations.Ships;
using API.Features.Reservations.Statistics;
using API.Infrastructure.Auth;
using API.Infrastructure.Users;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class Interfaces {

        public static void AddInterfaces(IServiceCollection services) {
            #region reservations
            services.AddTransient<IAvailabilityCalendar, AvailabilityCalendar>();
            services.AddTransient<IBoardingRepository, BoardingRepository>();
            services.AddTransient<ICoachRouteRepository, CoachRouteRepository>();
            services.AddTransient<ICoachRouteValidation, CoachRouteValidation>();
            services.AddTransient<ICrewSpecialtyRepository, CrewSpecialtyRepository>();
            services.AddTransient<ICustomerAadeRepository, CustomerAadeRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<ICustomerValidation, CustomerValidation>();
            services.AddTransient<IDestinationRepository, DestinationRepository>();
            services.AddTransient<IDestinationValidation, DestinationValidation>();
            services.AddTransient<IDriverRepository, DriverRepository>();
            services.AddTransient<IDriverValidation, DriverValidation>();
            services.AddTransient<IGenderRepository, GenderRepository>();
            services.AddTransient<IGenderRepository, GenderRepository>();
            services.AddTransient<IIdentityDocumentRepository, IdentityDocumentRepository>();
            services.AddTransient<IIdentityDocumentValidation, IdentityDocumentValidation>();
            services.AddTransient<ILedgerRepository, LedgerRepository>();
            services.AddTransient<IManifestRepository, ManifestRepository>();
            services.AddTransient<INationalityRepository, NationalityRepository>();
            services.AddTransient<IPickupPointRepository, PickupPointRepository>();
            services.AddTransient<IPickupPointValidation, PickupPointValidation>();
            services.AddTransient<IPortRepository, PortRepository>();
            services.AddTransient<IPortValidation, PortValidation>();
            services.AddTransient<IReservationCalendar, ReservationCalendar>();
            services.AddTransient<IReservationParameterValidation, ParameterValidation>();
            services.AddTransient<IReservationParametersRepository, ParametersRepository>();
            services.AddTransient<IReservationReadRepository, ReservationReadRepository>();
            services.AddTransient<IReservationSendToEmail, ReservationSendToEmail>();
            services.AddTransient<IReservationUpdateRepository, ReservationUpdateRepository>();
            services.AddTransient<IReservationValidation, ReservationValidation>();
            services.AddTransient<IScheduleRepository, ScheduleRepository>();
            services.AddTransient<IScheduleValidation, ScheduleValidation>();
            services.AddTransient<IShipCrewRepository, ShipCrewRepository>();
            services.AddTransient<IShipCrewValidation, ShipCrewValidation>();
            services.AddTransient<IShipOwnerAadeRepository, ShipOwnerAadeRepository>();
            services.AddTransient<IShipOwnerRepository, ShipOwnerRepository>();
            services.AddTransient<IShipOwnerValidation, ShipOwnerValidation>();
            services.AddTransient<IShipRepository, ShipRepository>();
            services.AddTransient<IShipValidation, ShipValidation>();
            services.AddTransient<IStatisticsRepository, StatisticsRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserValidation<IUser>, UserValidation>();
            #endregion
            #region billing
            services.AddTransient<IBankAccountRepository, BankAccountRepository>();
            services.AddTransient<IBankAccountValidation, BankAccountValidation>();
            services.AddTransient<IBankRepository, BankRepository>();
            services.AddTransient<IBankValidation, BankValidation>();
            services.AddTransient<IDocumentTypeRepository, DocumentTypeRepository>();
            services.AddTransient<IDocumentTypeValidation, DocumentTypeValidation>();
            services.AddTransient<IInvoiceCalculateBalanceRepo, InvoiceCalculateBalanceRepo>();
            services.AddTransient<IInvoiceEmailSender, InvoiceEmailSender>();
            services.AddTransient<IInvoicePdfRepository, InvoicePdfRepository>();
            services.AddTransient<IInvoiceReadRepository, InvoiceReadRepository>();
            services.AddTransient<IInvoiceUpdateRepository, InvoiceUpdateRepository>();
            services.AddTransient<IInvoiceValidation, InvoiceValidation>();
            services.AddTransient<IInvoiceXmlRepository, InvoiceXmlRepository>();
            services.AddTransient<ILedgerBillingRepository, LedgerBillingRepository>();
            services.AddTransient<ILedgerEmailSender, LedgerEmailSender>();
            services.AddTransient<IPaymentMethodRepository, PaymentMethodRepository>();
            services.AddTransient<IPaymentMethodValidation, PaymentMethodValidation>();
            services.AddTransient<IPriceCloneRepository, PriceCloneRepository>();
            services.AddTransient<IPriceRepository, PriceRepository>();
            services.AddTransient<IPriceValidation, PriceValidation>();
            services.AddTransient<IReceiptCalculateBalanceRepo, ReceiptCalculateBalanceRepo>();
            services.AddTransient<IReceiptEmailSender, ReceiptEmailSender>();
            services.AddTransient<IReceiptPdfRepository, ReceiptPdfRepository>();
            services.AddTransient<IReceiptRepository, ReceiptRepository>();
            services.AddTransient<IReceiptValidation, ReceiptValidation>();
            services.AddTransient<IRetailReadRepository, RetailReadRepository>();
            services.AddTransient<IRetailUpdateRepository, RetailUpdateRepository>();
            services.AddTransient<IRetailValidation, RetailValidation>();
            services.AddTransient<ITaxOfficeRepository, TaxOfficeRepository>();
            services.AddTransient<ITaxOfficeValidation, TaxOfficeValidation>();
            services.AddTransient<IVatRegimeRepository, VatRegimeRepository>();
            services.AddTransient<IVatRegimeValidation, VatRegimeValidation>();
            #endregion
            #region shared
            services.AddScoped<Token>();
            services.AddTransient<IEmailSender, EmailSender>();
            #endregion
            #region checkIn
            services.AddTransient<ICheckInReadRepository, CheckInReadRepository>();
            services.AddTransient<ICheckInSendToEmail, CheckInSendToEmail>();
            services.AddTransient<ICheckInUpdateRepository, CheckInUpdateRepository>();
            services.AddTransient<ICheckInValidation, CheckInValidation>();
            #endregion
        }

    }

}