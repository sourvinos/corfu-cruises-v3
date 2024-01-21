using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Billing.Invoices {

    public class InvoiceMappingProfile : Profile {

        public InvoiceMappingProfile() {
            // List
            CreateMap<Invoice, InvoiceListVM>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                .ForMember(x => x.Customer, x => x.MapFrom(x => new SimpleEntity { Id = x.Customer.Id, Description = x.Customer.Description }))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new SimpleEntity { Id = x.Destination.Id, Description = x.Destination.Description }))
                .ForMember(x => x.DocumentType, x => x.MapFrom(x => new DocumentTypeVM { Id = x.DocumentType.Id, Abbreviation = x.DocumentType.Abbreviation, Batch = x.DocumentType.Batch }))
                .ForMember(x => x.Ship, x => x.MapFrom(x => new SimpleEntity { Id = x.Ship.Id, Description = x.Ship.Description }));
        }

    }

}