using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Reservations.Ships {

    public class ShipMappingProfile : Profile {

        public ShipMappingProfile() {
            CreateMap<Ship, ShipListVM>();
            CreateMap<Ship, ShipBrowserVM>();
            CreateMap<Ship, SimpleEntity>();
            CreateMap<Ship, ShipReadDto>()
                .ForMember(x => x.ShipOwner, x => x.MapFrom(x => new SimpleEntity { Id = x.ShipOwner.Id, Description = x.ShipOwner.Description }));
            CreateMap<ShipWriteDto, Ship>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()))
                .ForMember(x => x.RegistryNo, x => x.MapFrom(x => x.RegistryNo.Trim()));
        }

    }

}