using AutoMapper;

namespace API.Features.Customers {

    public class CustomerMappingProfile : Profile {

        public CustomerMappingProfile() {
            CreateMap<Customer, CustomerListVM>();
            CreateMap<Customer, CustomerAutoCompleteVM>();
            CreateMap<Customer, CustomerReadDto>()
                .ForMember(x => x.PutAt, x => x.MapFrom(x => x.PutAt ?? ""))
                .ForMember(x => x.PutUser, x => x.MapFrom(x => x.PutUser ?? ""));
            CreateMap<CustomerWriteDto, Customer>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Profession, x => x.MapFrom(x => x.Profession.Trim()))
                .ForMember(x => x.Address, x => x.MapFrom(x => x.Address.Trim()))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones.Trim()))
                .ForMember(x => x.PersonInCharge, x => x.MapFrom(x => x.PersonInCharge.Trim()))
                .ForMember(x => x.Email, x => x.MapFrom(x => x.Email));
        }

    }

}