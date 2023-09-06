using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.CoachRoutes {

    public class CoachRouteReadDto : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public bool HasTransfer { get; set; }
        public bool IsActive { get; set; }
        // Object fields
        public SimpleEntity Port { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // RowVersion
        public string RowVersion { get; set; }

    }

}