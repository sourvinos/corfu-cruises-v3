using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Infrastructure.Parameters {

    public class SettingMappingProfile : Profile {

        public SettingMappingProfile() {
            CreateMap<Parameter, ParameterReadDto>()
                .ForMember(x => x.ClosingTime, x => x.MapFrom(x => x.ClosingTime))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones))
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => x.LastUpdate));
            CreateMap<ParameterWriteDto, Parameter>()
                .ForMember(x => x.ClosingTime, x => x.MapFrom(x => x.ClosingTime))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones))
                .ForMember(x => x.UserId, x => x.MapFrom(x => x.UserId))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime())));
        }

    }

}