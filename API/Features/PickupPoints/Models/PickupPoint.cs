using System.Collections.Generic;
using API.Features.CoachRoutes;
using API.Features.Reservations;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.PickupPoints {

    public class PickupPoint : IMetadataWrite {

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
        // Navigation
                public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }
        public CoachRoute CoachRoute { get; set; }
        public UserExtended User { get; set; }
        public List<Reservation> Reservations { get; set; }

    }

}