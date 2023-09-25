using System.Collections.Generic;
using API.Features.PickupPoints;
using API.Infrastructure.Interfaces;

namespace API.Features.CoachRoutes {

    public class CoachRoute : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public bool HasTransfer { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public List<PickupPoint> PickupPoints { get; set; }

    }

}