using System.Collections.Generic;
using API.Features.Reservations;
using API.Features.Schedules;
using API.Infrastructure.Interfaces;

namespace API.Features.Destinations {

    public class Destination : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public List<Schedule> Schedules { get; set; }
        public List<Reservation> Reservations { get; set; }

    }

}