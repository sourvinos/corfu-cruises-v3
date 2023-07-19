using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.ShipOwners {

    public class ShipOwnerMappingProfile : Profile {

        public ShipOwnerMappingProfile() {
            CreateMap<ShipOwner, ShipOwnerListVM>();
            CreateMap<ShipOwner, ShipOwnerAutoCompleteVM>();
            CreateMap<ShipOwner, ShipOwnerReadDto>()
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => x.LastUpdate));
            CreateMap<ShipOwnerWriteDto, ShipOwner>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Profession, x => x.MapFrom(x => x.Profession.Trim()))
                .ForMember(x => x.Address, x => x.MapFrom(x => x.Address.Trim()))
                .ForMember(x => x.TaxNo, x => x.MapFrom(x => x.TaxNo.Trim()))
                .ForMember(x => x.City, x => x.MapFrom(x => x.City.Trim()))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones.Trim()))
                .ForMember(x => x.UserId, x => x.MapFrom(x => x.UserId))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime())));
        }

    }

}