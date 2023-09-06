using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Infrastructure.Parameters {

    public class SettingMappingProfile : Profile {

        public SettingMappingProfile() {
            CreateMap<Parameter, ParameterReadDto>()
                .ForMember(x => x.PutAt, x => x.MapFrom(x => x.PutAt ?? ""))
                .ForMember(x => x.PutUser, x => x.MapFrom(x => x.PutUser ?? ""))
                .ForMember(x => x.RowVersion, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.RowVersion)));
            CreateMap<ParameterWriteDto, Parameter>()
                .ForMember(x => x.ClosingTime, x => x.MapFrom(x => x.ClosingTime))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones));
        }

    }

}