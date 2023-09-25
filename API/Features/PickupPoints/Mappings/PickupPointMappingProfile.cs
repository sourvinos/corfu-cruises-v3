using API.Features.CoachRoutes;
using API.Features.Ports;
using AutoMapper;

namespace API.Features.PickupPoints {

    public class PickupPointMappingProfile : Profile {

        public PickupPointMappingProfile() {
            // List
            CreateMap<PickupPoint, PickupPointListVM>()
                .ForMember(x => x.CoachRoute, x => x.MapFrom(x => new PickupPointListCoachRouteVM {
                    Id = x.CoachRoute.Id,
                    Abbreviation = x.CoachRoute.Abbreviation
                }))
                .ForMember(x => x.Port, x => x.MapFrom(x => new PickupPointListPortVM {
                    Id = x.Port.Id,
                    Abbreviation = x.Port.Abbreviation,
                    Description = x.Port.Description
                }));
            // Autocomplete
            CreateMap<PickupPoint, PickupPointAutoCompleteVM>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description))
                .ForMember(x => x.ExactPoint, x => x.MapFrom(x => x.ExactPoint))
                .ForMember(x => x.Time, x => x.MapFrom(x => x.Time))
                .ForMember(x => x.Port, x => x.MapFrom(x => new PortAutoCompleteVM {
                    Id = x.Port.Id,
                    Abbreviation = x.Port.Abbreviation,
                    Description = x.Port.Description
                }));
            // GetById
            CreateMap<PickupPoint, PickupPointReadDto>()
                .ForMember(x => x.CoachRoute, x => x.MapFrom(x => new CoachRouteAutoCompleteVM {
                    Id = x.CoachRoute.Id,
                    Abbreviation = x.CoachRoute.Abbreviation
                }))
                .ForMember(x => x.Port, x => x.MapFrom(x => new PortAutoCompleteVM {
                    Id = x.Port.Id,
                    Abbreviation = x.Port.Abbreviation,
                    Description = x.Port.Description
                }));
            // Write
            CreateMap<PickupPointWriteDto, PickupPoint>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.ExactPoint, x => x.MapFrom(x => x.ExactPoint.Trim()))
                .ForMember(x => x.Remarks, x => x.MapFrom(x => x.Remarks.Trim()));
        }

    }

}