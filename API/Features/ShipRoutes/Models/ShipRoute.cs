using API.Features.Users;
using API.Infrastructure.Interfaces;

namespace API.Features.ShipRoutes {

    public class ShipRoute : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string FromPort { get; set; }
        public string FromTime { get; set; }
        public string ViaPort { get; set; }
        public string ViaTime { get; set; }
        public string ToPort { get; set; }
        public string ToTime { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }

    }

}