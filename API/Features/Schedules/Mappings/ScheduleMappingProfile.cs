using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Schedules {

    public class ScheduleMappingProfile : Profile {

        public ScheduleMappingProfile() {
            CreateMap<Schedule, ScheduleListVM>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new SimpleEntity { Id = x.Destination.Id, Description = x.Destination.Description }))
                .ForMember(x => x.Port, x => x.MapFrom(x => new SimpleEntity { Id = x.Port.Id, Description = x.Port.Description }));
            CreateMap<Schedule, ScheduleReadDto>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new SimpleEntity { Id = x.Destination.Id, Description = x.Destination.Description }))
                .ForMember(x => x.Port, x => x.MapFrom(x => new SimpleEntity { Id = x.Port.Id, Description = x.Port.Description }))
                .ForMember(x => x.User, x => x.MapFrom(x => x.User.Displayname))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => x.LastUpdate));
            CreateMap<ScheduleWriteDto, Schedule>()
                .ForMember(x => x.UserId, x => x.MapFrom(x => x.UserId))
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateHelpers.GetLocalDateTime())));
        }

    }

}