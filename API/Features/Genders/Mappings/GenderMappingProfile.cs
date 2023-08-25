using AutoMapper;

namespace API.Features.Genders {

    public class GenderMappingProfile : Profile {

        public GenderMappingProfile() {
            CreateMap<Gender, GenderListVM>();
            CreateMap<Gender, GenderAutoCompleteVM>();
            CreateMap<Gender, GenderReadDto>()
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => x.LastUpdate));
            CreateMap<GenderWriteDto, Gender>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}