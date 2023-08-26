using System.Collections.Generic;
using API.Features.Reservations;
using API.Features.ShipCrews;
using API.Features.Users;
using API.Infrastructure.Interfaces;

namespace API.Features.Nationalities {

    public class Nationality : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }
        public List<ShipCrew> ShipCrews { get; set; }
        public List<Passenger> Passengers { get; set; }

    }

}