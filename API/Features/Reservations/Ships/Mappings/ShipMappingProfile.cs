using API.Features.Reservations.Nationalities;
using API.Features.Reservations.ShipOwners;
using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Reservations.Ships {

    public class ShipMappingProfile : Profile {

        public ShipMappingProfile() {
            CreateMap<Ship, ShipListVM>();
            CreateMap<Ship, ShipAutoCompleteVM>()
                .ForMember(x => x.ShipOwner, x => x.MapFrom(x => new ShipOwnerAutoCompleteVM {
                    Id = x.ShipOwner.Id,
                    Description = x.ShipOwner.Description,
                    TaxNo = x.ShipOwner.TaxNo,
                    Branch = x.ShipOwner.Branch,
                    Address = x.ShipOwner.Address,
                    PostalCode = x.ShipOwner.PostalCode,
                    City = x.ShipOwner.City,
                    Nationality = new NationalityAutoCompleteVM {
                        Id = x.ShipOwner.Nationality.Id,
                        Code = x.ShipOwner.Nationality.Code,
                        Description = x.ShipOwner.Nationality.Description,
                        IsActive = x.ShipOwner.Nationality.IsActive
                    },
                    IsActive = x.ShipOwner.IsActive
                }));
            CreateMap<Ship, ShipReadDto>()
                .ForMember(x => x.ShipOwner, x => x.MapFrom(x => new SimpleEntity { Id = x.ShipOwner.Id, Description = x.ShipOwner.Description }));
            CreateMap<ShipWriteDto, Ship>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()))
                .ForMember(x => x.IMO, x => x.MapFrom(x => x.IMO.Trim()))
                .ForMember(x => x.Flag, x => x.MapFrom(x => x.Flag.Trim()))
                .ForMember(x => x.RegistryNo, x => x.MapFrom(x => x.RegistryNo.Trim()))
                .ForMember(x => x.Manager, x => x.MapFrom(x => x.Manager.Trim()))
                .ForMember(x => x.ManagerInGreece, x => x.MapFrom(x => x.ManagerInGreece.Trim()))
                .ForMember(x => x.Agent, x => x.MapFrom(x => x.Agent.Trim()));
        }

    }

}