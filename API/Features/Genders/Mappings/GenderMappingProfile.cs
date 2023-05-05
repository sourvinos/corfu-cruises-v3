using System;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Genders {

    public class GenderMappingProfile : Profile {

        public GenderMappingProfile() {
            CreateMap<Gender, GenderListVM>();
            CreateMap<Gender, GenderActiveVM>();
            CreateMap<Gender, GenderReadDto>();
            CreateMap<GenderWriteDto, Gender>()
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateTime.Now)));
        }

    }

}