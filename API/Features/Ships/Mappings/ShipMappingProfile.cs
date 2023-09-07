using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Ships {

    public class ShipMappingProfile : Profile {

        public ShipMappingProfile() {
            CreateMap<Ship, ShipListVM>();
            CreateMap<Ship, ShipAutoCompleteVM>();
            CreateMap<Ship, ShipReadDto>()
                .ForMember(x => x.ShipOwner, x => x.MapFrom(x => new SimpleEntity { Id = x.ShipOwner.Id, Description = x.ShipOwner.Description }))
                .ForMember(x => x.RowVersion, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.RowVersion)));
            CreateMap<ShipWriteDto, Ship>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()))
                .ForMember(x => x.IMO, x => x.MapFrom(x => x.IMO.Trim()))
                .ForMember(x => x.Flag, x => x.MapFrom(x => x.Flag.Trim()))
                .ForMember(x => x.RegistryNo, x => x.MapFrom(x => x.RegistryNo.Trim()))
                .ForMember(x => x.Manager, x => x.MapFrom(x => x.Manager.Trim()))
                .ForMember(x => x.ManagerInGreece, x => x.MapFrom(x => x.ManagerInGreece.Trim()))
                .ForMember(x => x.Agent, x => x.MapFrom(x => x.Agent.Trim()));
        }

    }

}