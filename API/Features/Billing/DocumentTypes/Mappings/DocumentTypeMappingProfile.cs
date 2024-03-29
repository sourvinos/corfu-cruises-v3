using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeMappingProfile : Profile {

        public DocumentTypeMappingProfile() {
            CreateMap<DocumentType, DocumentTypeListVM>()
                .ForMember(x => x.Company, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Company.Id,
                    Description = x.Company.Description
                }))
                .ForMember(x => x.LastDate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.LastDate)));
            CreateMap<DocumentType, DocumentTypeBrowserVM>();
            CreateMap<DocumentType, DocumentTypeReadDto>()
                .ForMember(x => x.Company, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Company.Id,
                    Description = x.Company.Description
                }))
                .ForMember(x => x.LastDate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.LastDate)));
            CreateMap<DocumentTypeWriteDto, DocumentType>()
                .ForMember(x => x.Abbreviation, x => x.MapFrom(x => x.Abbreviation.Trim()))
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}