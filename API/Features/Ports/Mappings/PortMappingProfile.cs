using System;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Ports {

    public class PortMappingProfile : Profile {

        public PortMappingProfile() {
            CreateMap<Port, PortListVM>();
            CreateMap<Port, PortActiveVM>();
            CreateMap<Port, PortReadDto>();
            CreateMap<PortWriteDto, Port>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateTime.Now)));
        }

    }

}