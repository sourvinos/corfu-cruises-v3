using AutoMapper;

namespace API.Features.TaxOffices {

    public class TaxOfficeMappingProfile : Profile {

        public TaxOfficeMappingProfile() {
            CreateMap<TaxOffice, TaxOfficeListVM>();
            CreateMap<TaxOffice, TaxOfficeReadDto>();
            CreateMap<TaxOfficeWriteDto, TaxOffice>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}