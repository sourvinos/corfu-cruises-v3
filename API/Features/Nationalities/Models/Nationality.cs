using System.Collections.Generic;
using API.Features.Reservations;
using API.Features.ShipCrews;
using API.Infrastructure.Interfaces;

namespace API.Features.Nationalities {

    public class Nationality : INewBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Code { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public List<ShipCrew> ShipCrews { get; set; }
        public List<Passenger> Passengers { get; set; }

    }

}