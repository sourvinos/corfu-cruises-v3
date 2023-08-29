using AutoMapper;

namespace API.Features.Nationalities {

    public class NationalityMappingProfile : Profile {

        public NationalityMappingProfile() {
            CreateMap<Nationality, NationalityListVM>();
            CreateMap<Nationality, NationalityAutoCompleteVM>();
            CreateMap<Nationality, NationalityReadDto>();
            CreateMap<NationalityWriteDto, Nationality>();
        }

    }

}