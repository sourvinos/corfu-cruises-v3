using System;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Customers {

    public class CustomerMappingProfile : Profile {

        public CustomerMappingProfile() {
            CreateMap<Customer, CustomerListVM>();
            CreateMap<Customer, CustomerActiveVM>();
            CreateMap<Customer, CustomerReadDto>()
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => x.LastUpdate));
            CreateMap<CustomerWriteDto, Customer>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Profession, x => x.MapFrom(x => x.Profession.Trim()))
                .ForMember(x => x.Address, x => x.MapFrom(x => x.Address.Trim()))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones.Trim()))
                .ForMember(x => x.PersonInCharge, x => x.MapFrom(x => x.PersonInCharge.Trim()))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateTime.Now)));
        }

    }

}