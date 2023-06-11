using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.CoachRoutes {

    public class CoachRouteMappingProfile : Profile {

        public CoachRouteMappingProfile() {
            CreateMap<CoachRoute, CoachRouteListVM>();
            CreateMap<CoachRoute, CoachRouteActiveVM>();
            CreateMap<CoachRoute, CoachRouteReadDto>()
                .ForMember(x => x.Port, x => x.MapFrom(x => new SimpleEntity { Id = x.Port.Id, Description = x.Port.Description }))
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => x.LastUpdate));
            CreateMap<CoachRouteWriteDto, CoachRoute>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()))
                .ForMember(x => x.UserId, x => x.MapFrom(x => x.UserId))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime())));
        }

    }

}