using API.Features.Reservations.Nationalities;
using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Reservations.Customers {

    public class CustomerMappingProfile : Profile {

        public CustomerMappingProfile() {
            CreateMap<Customer, CustomerListVM>();
            CreateMap<Customer, CustomerBrowserStorageVM>()
                .ForMember(x => x.Nationality, x => x.MapFrom(x => new NationalityAutoCompleteVM {
                    Id = x.Nationality.Id,
                    Code = x.Nationality.Code,
                    Description = x.Nationality.Description,
                    IsActive = x.Nationality.IsActive
                }));
            CreateMap<Customer, CustomerReadDto>()
                .ForMember(x => x.TaxOffice, x => x.MapFrom(x => new SimpleEntity { Id = x.TaxOffice.Id, Description = x.TaxOffice.Description }))
                .ForMember(x => x.Nationality, x => x.MapFrom(x => new SimpleEntity { Id = x.Nationality.Id, Description = x.Nationality.Description }))
                .ForMember(x => x.VatRegime, x => x.MapFrom(x => new SimpleEntity { Id = x.VatRegime.Id, Description = x.VatRegime.Description }));
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