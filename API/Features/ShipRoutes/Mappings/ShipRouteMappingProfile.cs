using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.ShipRoutes {

    public class ShipRouteMappingProfile : Profile {

        public ShipRouteMappingProfile() {
            CreateMap<ShipRoute, ShipRouteListVM>();
            CreateMap<ShipRoute, ShipRouteAutoCompleteVM>();
            CreateMap<ShipRoute, ShipRouteReadDto>()
                .ForMember(x => x.RowVersion, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.RowVersion)));
            CreateMap<ShipRouteWriteDto, ShipRoute>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.FromPort, x => x.MapFrom(x => x.FromPort.Trim()))
                .ForMember(x => x.ViaPort, x => x.MapFrom(x => x.ViaPort.Trim()))
                .ForMember(x => x.ToPort, x => x.MapFrom(x => x.ToPort.Trim()));
        }

    }

}