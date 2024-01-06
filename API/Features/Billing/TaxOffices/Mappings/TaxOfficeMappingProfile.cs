using AutoMapper;

namespace API.Features.Billing.TaxOffices {

    public class TaxOfficeMappingProfile : Profile {

        public TaxOfficeMappingProfile() {
            CreateMap<TaxOffice, TaxOfficeListVM>();
            CreateMap<TaxOffice, TaxOfficeAutoCompleteVM>();
            CreateMap<TaxOffice, TaxOfficeReadDto>();
            CreateMap<TaxOfficeWriteDto, TaxOffice>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}