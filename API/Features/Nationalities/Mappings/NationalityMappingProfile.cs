using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Nationalities {

    public class NationalityMappingProfile : Profile {

        public NationalityMappingProfile() {
            CreateMap<Nationality, NationalityListVM>();
            CreateMap<Nationality, NationalityAutoCompleteVM>();
            CreateMap<Nationality, NationalityReadDto>()
                .ForMember(x => x.RowVersion, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.RowVersion)));
            CreateMap<NationalityWriteDto, Nationality>();
        }

    }

}