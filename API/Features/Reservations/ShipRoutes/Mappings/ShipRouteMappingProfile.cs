using AutoMapper;

namespace API.Features.Reservations.ShipRoutes {

    public class ShipRouteMappingProfile : Profile {

        public ShipRouteMappingProfile() {
            CreateMap<ShipRoute, ShipRouteListVM>();
            CreateMap<ShipRoute, ShipRouteAutoCompleteVM>();
            CreateMap<ShipRoute, ShipRouteReadDto>();
            CreateMap<ShipRouteWriteDto, ShipRoute>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.FromPort, x => x.MapFrom(x => x.FromPort.Trim()))
                .ForMember(x => x.ViaPort, x => x.MapFrom(x => x.ViaPort.Trim()))
                .ForMember(x => x.ToPort, x => x.MapFrom(x => x.ToPort.Trim()));
        }

    }

}