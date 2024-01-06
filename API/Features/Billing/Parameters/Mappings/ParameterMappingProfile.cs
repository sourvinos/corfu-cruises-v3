using AutoMapper;

namespace API.Features.Billing.Parameters {

    public class ParameterMappingProfile : Profile {

        public ParameterMappingProfile() {
            CreateMap<BillingParameter, ParameterReadDto>();
            CreateMap<ParameterWriteDto, BillingParameter>();
        }

    }

}