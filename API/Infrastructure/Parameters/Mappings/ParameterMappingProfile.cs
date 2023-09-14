using AutoMapper;

namespace API.Infrastructure.Parameters {

    public class ParameterMappingProfile : Profile {

        public ParameterMappingProfile() {
            CreateMap<Parameter, ParameterReadDto>();
            CreateMap<ParameterWriteDto, Parameter>()
                .ForMember(x => x.ClosingTime, x => x.MapFrom(x => x.ClosingTime))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones));
        }

    }

}