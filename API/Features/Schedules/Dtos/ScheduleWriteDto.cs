using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Schedules {

    public class ScheduleWriteDto : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // FK
        public int DestinationId { get; set; }
        public int PortId { get; set; }
        // Fields
        public string Date { get; set; }
        public int MaxPax { get; set; }
        public string Time { get; set; }
        public bool IsActive { get; set; }
        // Navigation
                public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}