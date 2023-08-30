using System.Collections.Generic;
using API.Features.CoachRoutes;
using API.Features.Reservations;
using API.Features.Schedules;
using API.Features.Users;

namespace API.Features.Ports {

    public class Port {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public int StopOrder { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdate { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<CoachRoute> CoachRoutes { get; set; }
        public List<Schedule> Schedules { get; set; }

    }

}