using AutoMapper;

namespace API.Features.Reservations.CrewSpecialties {

    public class CrewSpecialtyMappingProfile : Profile {

        public CrewSpecialtyMappingProfile() {
            CreateMap<CrewSpecialty, CrewSpecialtyListVM>();
            CreateMap<CrewSpecialty, CrewSpecialtyBrowserStorageVM>();
            CreateMap<CrewSpecialty, CrewSpecialtyReadDto>();
            CreateMap<CrewSpecialtyWriteDto, CrewSpecialty>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}