using System.Collections.Generic;
using API.Features.CoachRoutes;
using API.Features.Reservations;
using API.Infrastructure.Interfaces;

namespace API.Features.PickupPoints {

    public class PickupPoint : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // FKs
        public int CoachRouteId { get; set; }
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
        // Navigation
        public CoachRoute CoachRoute { get; set; }
        public List<Reservation> Reservations { get; set; }

    }

}