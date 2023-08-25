using AutoMapper;

namespace API.Features.Customers {

    public class CustomerMappingProfile : Profile {

        public CustomerMappingProfile() {
            CreateMap<Customer, CustomerListVM>();
            CreateMap<Customer, CustomerAutoCompleteVM>();
            CreateMap<Customer, CustomerReadDto>()
                .ForMember(x => x.PostUser, x => x.MapFrom(x => x.User.Displayname));
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