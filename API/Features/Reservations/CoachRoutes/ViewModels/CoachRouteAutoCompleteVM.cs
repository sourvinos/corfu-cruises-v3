using API.Infrastructure.Classes;

namespace API.Features.Reservations.CoachRoutes {

    public class CoachRouteAutoCompleteVM : SimpleEntity {

        public string Abbreviation { get; set; }
        public bool IsActive { get; set; }

    }

}