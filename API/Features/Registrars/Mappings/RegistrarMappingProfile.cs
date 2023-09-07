using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Registrars {

    public class RegistrarMappingProfile : Profile {

        public RegistrarMappingProfile() {
            CreateMap<Registrar, RegistrarListVM>()
                .ForMember(x => x.Ship, x => x.MapFrom(x => new SimpleEntity { Id = x.Ship.Id, Description = x.Ship.Description }));
            CreateMap<Registrar, RegistrarAutoCompleteVM>();
            CreateMap<Registrar, RegistrarReadDto>()
                .ForMember(x => x.Ship, x => x.MapFrom(x => new SimpleEntity { Id = x.Ship.Id, Description = x.Ship.Description }))
                .ForMember(x => x.RowVersion, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(x.RowVersion)));
            CreateMap<RegistrarWriteDto, Registrar>()
                .ForMember(x => x.Fullname, x => x.MapFrom(x => x.Fullname.Trim()))
                .ForMember(x => x.Phones, x => x.MapFrom(x => x.Phones.Trim()))
                .ForMember(x => x.Fax, x => x.MapFrom(x => x.Fax.Trim()))
                .ForMember(x => x.Address, x => x.MapFrom(x => x.Address.Trim()));
        }

    }

}