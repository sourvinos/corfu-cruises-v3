using AutoMapper;

namespace API.Features.Destinations {

    public class DestinationMappingProfile : Profile {

        public DestinationMappingProfile() {
            CreateMap<Destination, DestinationListVM>();
            CreateMap<Destination, DestinationAutoCompleteVM>();
            CreateMap<Destination, DestinationReadDto>()
                .ForMember(x => x.PostUser, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.PutUser, x => x.MapFrom(x => x.User.Displayname));
            CreateMap<DestinationWriteDto, Destination>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()));
        }

    }

}