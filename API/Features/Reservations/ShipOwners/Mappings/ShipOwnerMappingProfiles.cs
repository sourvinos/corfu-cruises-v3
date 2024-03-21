using API.Features.Reservations.Nationalities;
using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwnerMappingProfile : Profile {

        public ShipOwnerMappingProfile() {
            // List
            CreateMap<ShipOwner, ShipOwnerListVM>();
            // Autocomplete
            CreateMap<ShipOwner, ShipOwnerBrowserStorageVM>()
                .ForMember(x => x.Nationality, x => x.MapFrom(x => new NationalityAutoCompleteVM {
                    Id = x.Nationality.Id,
                    Code = x.Nationality.Code,
                    Description = x.Nationality.Description,
                    IsActive = x.Nationality.IsActive
                }))
                .ForMember(x => x.TaxOffice, x => x.MapFrom(x => x.TaxOffice.Description))
                .ForMember(x => x.Url, x => x.MapFrom(x => x.IsDemoMyData ? x.DemoUrl : x.LiveUrl))
                .ForMember(x => x.Username, x => x.MapFrom(x => x.IsDemoMyData ? x.DemoUsername : x.LiveUsername))
                .ForMember(x => x.SubscriptionKey, x => x.MapFrom(x => x.IsDemoMyData ? x.DemoSubscriptionKey : x.LiveSubscriptionKey));
            // Form
            CreateMap<ShipOwner, ShipOwnerReadDto>()
                .ForMember(x => x.TaxOffice, x => x.MapFrom(x => new SimpleEntity { Id = x.TaxOffice.Id, Description = x.TaxOffice.Description }))
                .ForMember(x => x.Nationality, x => x.MapFrom(x => new SimpleEntity { Id = x.Nationality.Id, Description = x.Nationality.Description }))
                .ForMember(x => x.VatRegime, x => x.MapFrom(x => new SimpleEntity { Id = x.VatRegime.Id, Description = x.VatRegime.Description }));
            // Update
            CreateMap<ShipOwnerWriteDto, ShipOwner>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.VatNumber, x => x.MapFrom(x => x.VatNumber.Trim()))
                .ForMember(x => x.Profession, x => x.MapFrom(x => x.Profession.Trim()))
                .ForMember(x => x.Street, x => x.MapFrom(x => x.Street.Trim()))
                .ForMember(x => x.Number, x => x.MapFrom(x => x.Number.Trim()))
                .ForMember(x => x.PostalCode, x => x.MapFrom(x => x.PostalCode.Trim()))
                .ForMember(x => x.City, x => x.MapFrom(x => x.City.Trim()))
                .ForMember(x => x.PersonInCharge, x => x.MapFrom(x => x.PersonInCharge.Trim()))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones.Trim()));
        }

    }

}