using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Infrastructure.Parameters {

    public class SettingMappingProfile : Profile {

        public SettingMappingProfile() {
            CreateMap<Parameter, ParameterReadDto>()
                .ForMember(x => x.RowVersion, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.RowVersion)));
            CreateMap<ParameterWriteDto, Parameter>()
                .ForMember(x => x.ClosingTime, x => x.MapFrom(x => x.ClosingTime))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones));
        }

    }

}