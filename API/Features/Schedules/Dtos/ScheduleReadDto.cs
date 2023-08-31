using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Schedules {

    public class ScheduleReadDto : INewBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Date { get; set; }
        public int MaxPax { get; set; }
        public string Time { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public SimpleEntity Destination { get; set; }
        public SimpleEntity Port { get; set; }

    }

}