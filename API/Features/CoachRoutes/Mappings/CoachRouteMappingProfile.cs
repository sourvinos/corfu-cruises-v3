using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.CoachRoutes {

    public class CoachRouteMappingProfile : Profile {

        public CoachRouteMappingProfile() {
            CreateMap<CoachRoute, CoachRouteListVM>();
            CreateMap<CoachRoute, CoachRouteAutoCompleteVM>();
            CreateMap<CoachRoute, CoachRouteReadDto>()
                .ForMember(x => x.Port, x => x.MapFrom(x => new SimpleEntity { Id = x.Port.Id, Description = x.Port.Description }))
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname));
            CreateMap<CoachRouteWriteDto, CoachRoute>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()));
        }

    }

}