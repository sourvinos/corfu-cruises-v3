using AutoMapper;

namespace API.Features.VatRegimes {

    public class VatRegimeMappingProfile : Profile {

        public VatRegimeMappingProfile() {
            CreateMap<VatRegime, VatRegimeListVM>();
            CreateMap<VatRegime, VatRegimeAutoCompleteVM>();
            CreateMap<VatRegime, VatRegimeReadDto>();
            CreateMap<VatRegimeWriteDto, VatRegime>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}