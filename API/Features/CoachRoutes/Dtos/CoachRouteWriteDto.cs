using API.Infrastructure.Interfaces;

namespace API.Features.CoachRoutes {

    public class CoachRouteWriteDto : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // FK
        public int PortId { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public bool HasTransfer { get; set; }
        public bool IsActive { get; set; }
        // Navigation
        public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }

    }

}
