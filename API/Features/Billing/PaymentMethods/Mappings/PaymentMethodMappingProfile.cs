using AutoMapper;

namespace API.Features.PaymentMethods {

    public class PaymentMethodMappingProfile : Profile {

        public PaymentMethodMappingProfile() {
            CreateMap<PaymentMethod, PaymentMethodListVM>();
            CreateMap<PaymentMethod, PaymentMethodAutoCompleteVM>();
            CreateMap<PaymentMethod, PaymentMethodReadDto>();
            CreateMap<PaymentMethodWriteDto, PaymentMethod>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}