using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Codes {

    public class CodeMappingProfile : Profile {

        public CodeMappingProfile() {
            CreateMap<Code, CodeListVM>()
                .ForMember(x => x.LastDate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.LastDate)));
            CreateMap<Code, CodeAutoCompleteVM>();
            CreateMap<Code, CodeReadDto>()
                .ForMember(x => x.LastDate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.LastDate)));
            CreateMap<CodeWriteDto, Code>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}