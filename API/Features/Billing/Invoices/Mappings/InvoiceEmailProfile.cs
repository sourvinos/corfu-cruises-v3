using API.Features.Reservations.Customers;
using AutoMapper;

namespace API.Features.Billing.Invoices {

    public class InvoiceEmailProfile : Profile {

        public InvoiceEmailProfile() {
            CreateMap<Customer, EmailInvoiceCustomerVM>();
        }

    }

}