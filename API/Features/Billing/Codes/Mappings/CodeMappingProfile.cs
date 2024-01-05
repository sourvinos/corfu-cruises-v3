using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Codes {

    public class CodeMappingProfile : Profile {

        public CodeMappingProfile() {
            CreateMap<Code, CodeListVM>()
                .ForMember(x => x.LastDate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.LastDate)))
                .ForMember(x => x.Table8_1, x => x.MapFrom(x => x.Table8_1 == "" ? " " : x.Table8_1))
                .ForMember(x => x.Table8_8, x => x.MapFrom(x => x.Table8_8 == "" ? " " : x.Table8_8))
                .ForMember(x => x.Table8_9, x => x.MapFrom(x => x.Table8_9 == "" ? " " : x.Table8_9));
            CreateMap<Code, CodeAutoCompleteVM>();
            CreateMap<Code, CodeReadDto>()
                .ForMember(x => x.LastDate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.LastDate)));
            CreateMap<CodeWriteDto, Code>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()));
        }

    }

}