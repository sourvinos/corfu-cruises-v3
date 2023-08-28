using System.Collections.Generic;
using API.Features.CoachRoutes;
using API.Features.Reservations;
using API.Features.Schedules;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Ports {

    public class Port : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public int StopOrder { get; set; }
        public bool IsActive { get; set; }
        // Navigation
                public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }
        public UserExtended User { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<CoachRoute> CoachRoutes { get; set; }
        public List<Schedule> Schedules { get; set; }

    }

}