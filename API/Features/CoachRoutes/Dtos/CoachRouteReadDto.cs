using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.CoachRoutes {

    public class CoachRouteReadDto : INewBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public bool HasTransfer { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public SimpleEntity Port { get; set; }

    }

}