using AutoMapper;

namespace API.Features.Nationalities {

    public class NationalityMappingProfile : Profile {

        public NationalityMappingProfile() {
            CreateMap<Nationality, NationalityListVM>();
            CreateMap<Nationality, NationalityAutoCompleteVM>();
            CreateMap<Nationality, NationalityReadDto>()
                .ForMember(x => x.PostUser, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.PutUser, x => x.MapFrom(x => x.User.Displayname));
            CreateMap<NationalityWriteDto, Nationality>();
        }

    }

}