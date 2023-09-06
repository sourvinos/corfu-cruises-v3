using System;
using System.Collections.Generic;
using API.Features.CoachRoutes;
using API.Features.Reservations;
using API.Features.Schedules;
using API.Infrastructure.Interfaces;

namespace API.Features.Ports {

    public class Port : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public int StopOrder { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // RowVersion
        public DateTime RowVersion { get; set; }
        // Navigation
        public List<Reservation> Reservations { get; set; }
        public List<CoachRoute> CoachRoutes { get; set; }
        public List<Schedule> Schedules { get; set; }

    }

}