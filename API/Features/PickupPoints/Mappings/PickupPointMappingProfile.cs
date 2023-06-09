using API.Features.CoachRoutes;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.PickupPoints {

    public class PickupPointMappingProfile : Profile {

        public PickupPointMappingProfile() {
            CreateMap<PickupPoint, PickupPointListVM>()
                .ForMember(x => x.CoachRoute, x => x.MapFrom(x => new PickupPointListCoachRouteVM { Id = x.CoachRoute.Id, Abbreviation = x.CoachRoute.Abbreviation }));
            CreateMap<PickupPoint, PickupPointActiveVM>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description))
                .ForMember(x => x.ExactPoint, x => x.MapFrom(x => x.ExactPoint))
                .ForMember(x => x.Time, x => x.MapFrom(x => x.Time))
                .ForMember(x => x.Port, x => x.MapFrom(x => new SimpleEntity { Id = x.CoachRoute.Port.Id, Description = x.CoachRoute.Port.Description }));
            CreateMap<PickupPoint, PickupPointReadDto>()
                .ForMember(x => x.CoachRoute, x => x.MapFrom(x => new CoachRouteActiveVM { Id = x.CoachRoute.Id, Abbreviation = x.CoachRoute.Abbreviation }))
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => x.LastUpdate));
            CreateMap<PickupPointWriteDto, PickupPoint>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.ExactPoint, x => x.MapFrom(x => x.ExactPoint.Trim()))
                .ForMember(x => x.Remarks, x => x.MapFrom(x => x.Remarks.Trim()))
                .ForMember(x => x.UserId, x => x.MapFrom(x => x.UserId))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime())));
        }

    }

}