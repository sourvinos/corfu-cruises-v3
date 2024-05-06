using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeMappingProfile : Profile {

        public DocumentTypeMappingProfile() {
            // List
            CreateMap<DocumentType, DocumentTypeListVM>()
                .ForMember(x => x.Ship, x => x.MapFrom(x => x.Ship == null ? new SimpleEntity {
                    Id = 0,
                    Description = "(EMPTY)"
                } : new SimpleEntity {
                    Id = x.Ship.Id,
                    Description = x.Ship.Description
                }))
                .ForMember(x => x.ShipOwner, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.ShipOwner.Id,
                    Description = x.ShipOwner.Description
                }));
            // Browser
            CreateMap<DocumentType, DocumentTypeBrowserVM>()
                .ForMember(x => x.Ship, x => x.MapFrom(x => x.Ship == null ? new SimpleEntity {
                    Id = 0,
                    Description = "(EMPTY)"
                } : new SimpleEntity {
                    Id = x.Ship.Id,
                    Description = x.Ship.Description
                }))
                .ForMember(x => x.ShipOwner, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.ShipOwner.Id,
                    Description = x.ShipOwner.Description
                }));
            // Read
            CreateMap<DocumentType, DocumentTypeReadDto>()
                .ForMember(x => x.Ship, x => x.MapFrom(x => x.Ship == null ? new SimpleEntity {
                    Id = 0,
                    Description = "(EMPTY)"
                } : new SimpleEntity {
                    Id = x.Ship.Id,
                    Description = x.Ship.Description
                }))
                .ForMember(x => x.ShipOwner, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.ShipOwner.Id,
                    Description = x.ShipOwner.Description
                }));
            // Write
            CreateMap<DocumentTypeWriteDto, DocumentType>()
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()))
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}