using API.Features.Billing.Invoices;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.RetailSales {

    public class RetailSaleMappingProfile : Profile {

        public RetailSaleMappingProfile() {
            CreateMap<RetailSale, RetailSaleListVM>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                // .ForMember(x => x.Customer, x => x.MapFrom(x => new SimpleEntity { Id = x.Reservation.Customer.Id, Description = x.Reservation.Customer.Description }))
                .ForMember(x => x.DocumentType, x => x.MapFrom(x => new DocumentTypeVM { Id = x.DocumentType.Id, Description = x.DocumentType.Description, Batch = x.DocumentType.Batch }))
                .ForMember(x => x.ShipOwner, x => x.MapFrom(x => new SimpleEntity { Id = x.ShipOwner.Id, Description = x.ShipOwner.Description }))
                .ForMember(x => x.IsAadeUpdated, x => x.MapFrom(x => x.Mark != null))
                .ForMember(x => x.IsAadeCancelled, x => x.MapFrom(x => x.MarkCancel != null));
            CreateMap<RetailSaleWriteDto, RetailSale>()
                .ForMember(x => x.Remarks, x => x.MapFrom(x => x.Remarks.Trim()));
        }

    }

}