using API.Features.CoachRoutes;
using API.Infrastructure.Interfaces;

namespace API.Features.PickupPoints {

    public class PickupPointReadDto : IMetadataRead {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string ExactPoint { get; set; }
        public string Time { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

        public CoachRouteAutoCompleteVM CoachRoute { get; set; }

    }

}