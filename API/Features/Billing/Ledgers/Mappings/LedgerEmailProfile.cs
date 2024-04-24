using API.Features.Reservations.Customers;
using AutoMapper;

namespace API.Features.Billing.Ledgers {

    public class LedgerEmailProfile : Profile {

        public LedgerEmailProfile() {
            CreateMap<Customer, EmailLedgerCustomerVM>();
        }

    }

}