using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Genders {

    public class GenderMappingProfile : Profile {

        public GenderMappingProfile() {
            CreateMap<Gender, GenderListVM>();
            CreateMap<Gender, GenderAutoCompleteVM>();
            CreateMap<Gender, GenderReadDto>()
                .ForMember(x => x.RowVersion, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.RowVersion)));
            CreateMap<GenderWriteDto, Gender>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}