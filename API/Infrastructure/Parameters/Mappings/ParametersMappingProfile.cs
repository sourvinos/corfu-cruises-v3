using AutoMapper;

namespace API.Infrastructure.Parameters {

    public class SettingMappingProfile : Profile {

        public SettingMappingProfile() {
            CreateMap<Parameter, ParameterReadDto>();
            CreateMap<ParameterWriteDto, Parameter>()
                .ForMember(x => x.ClosingTime, x => x.MapFrom(x => x.ClosingTime))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones));
        }

    }

}