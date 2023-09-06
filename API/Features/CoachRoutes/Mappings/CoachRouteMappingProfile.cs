using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.CoachRoutes {

    public class CoachRouteMappingProfile : Profile {

        public CoachRouteMappingProfile() {
            CreateMap<CoachRoute, CoachRouteListVM>();
            CreateMap<CoachRoute, CoachRouteAutoCompleteVM>();
            CreateMap<CoachRoute, CoachRouteReadDto>()
                .ForMember(x => x.Port, x => x.MapFrom(x => new SimpleEntity { Id = x.Port.Id, Description = x.Port.Description }))
                .ForMember(x => x.PutAt, x => x.MapFrom(x => x.PutAt ?? ""))
                .ForMember(x => x.PutUser, x => x.MapFrom(x => x.PutUser ?? ""))
                .ForMember(x => x.RowVersion, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.RowVersion))); ;
            CreateMap<CoachRouteWriteDto, CoachRoute>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()));
        }

    }

}