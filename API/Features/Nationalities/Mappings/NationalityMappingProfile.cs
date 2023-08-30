using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Nationalities {

    public class NationalityMappingProfile : Profile {

        public NationalityMappingProfile() {
            CreateMap<Nationality, NationalityListVM>();
            CreateMap<Nationality, NationalityAutoCompleteVM>();
            CreateMap<Nationality, NationalityReadDto>()
                .ForMember(x => x.PutAt, x => x.MapFrom(x => x.PutAt ?? ""))
                .ForMember(x => x.PutUser, x => x.MapFrom(x => x.PutUser ?? ""));
            CreateMap<NationalityWriteDto, Nationality>();
        }

    }

}