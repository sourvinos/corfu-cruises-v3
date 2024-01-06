using AutoMapper;

namespace API.Features.Billing.Parameters {

    public class ParameterMappingProfile : Profile {

        public ParameterMappingProfile() {
            CreateMap<BillingParameter, ParameterReadDto>();
            CreateMap<ParameterWriteDto, BillingParameter>()
                .ForMember(x => x.ClosingTime, x => x.MapFrom(x => x.ClosingTime))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones));
        }

    }

}