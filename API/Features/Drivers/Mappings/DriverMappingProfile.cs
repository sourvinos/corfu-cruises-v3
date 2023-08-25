using AutoMapper;

namespace API.Features.Drivers {

    public class DriverMappingProfile : Profile {

        public DriverMappingProfile() {
            CreateMap<Driver, DriverListVM>();
            CreateMap<Driver, DriverAutoCompleteVM>();
            CreateMap<Driver, DriverReadDto>()
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => x.LastUpdate));
            CreateMap<DriverWriteDto, Driver>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones.Trim()));
        }

    }

}