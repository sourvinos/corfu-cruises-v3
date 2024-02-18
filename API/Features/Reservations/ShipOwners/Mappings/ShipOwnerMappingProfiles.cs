using API.Features.Reservations.Nationalities;
using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwnerMappingProfile : Profile {

        public ShipOwnerMappingProfile() {
            CreateMap<ShipOwner, ShipOwnerListVM>();
            CreateMap<ShipOwner, ShipOwnerBrowserStorageVM>()
                .ForMember(x => x.Nationality, x => x.MapFrom(x => new NationalityAutoCompleteVM {
                    Id = x.Nationality.Id,
                    Code = x.Nationality.Code,
                    Description = x.Nationality.Description,
                    IsActive = x.Nationality.IsActive
                }));
            CreateMap<ShipOwner, ShipOwnerReadDto>()
                .ForMember(x => x.TaxOffice, x => x.MapFrom(x => new SimpleEntity { Id = x.TaxOffice.Id, Description = x.TaxOffice.Description }))
                .ForMember(x => x.Nationality, x => x.MapFrom(x => new SimpleEntity { Id = x.Nationality.Id, Description = x.Nationality.Description }))
                .ForMember(x => x.VatRegime, x => x.MapFrom(x => new SimpleEntity { Id = x.VatRegime.Id, Description = x.VatRegime.Description }));
            CreateMap<ShipOwnerWriteDto, ShipOwner>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Profession, x => x.MapFrom(x => x.Profession.Trim()))
                .ForMember(x => x.Address, x => x.MapFrom(x => x.Address.Trim()))
                .ForMember(x => x.VatNumber, x => x.MapFrom(x => x.VatNumber.Trim()))
                .ForMember(x => x.City, x => x.MapFrom(x => x.City.Trim()))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones.Trim()));
        }

    }

}