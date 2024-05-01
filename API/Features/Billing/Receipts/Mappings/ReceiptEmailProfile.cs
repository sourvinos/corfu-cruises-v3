using API.Features.Reservations.Customers;
using AutoMapper;

namespace API.Features.Billing.Receipts {

    public class ReceiptEmailProfile : Profile {

        public ReceiptEmailProfile() {
            CreateMap<Customer, EmailReceiptCustomerVM>();
        }

    }

}