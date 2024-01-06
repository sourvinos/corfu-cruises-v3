using AutoMapper;

namespace API.Features.Reservations.Genders {

    public class GenderMappingProfile : Profile {

        public GenderMappingProfile() {
            CreateMap<Gender, GenderListVM>();
            CreateMap<Gender, GenderAutoCompleteVM>();
            CreateMap<Gender, GenderReadDto>();
            CreateMap<GenderWriteDto, Gender>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}