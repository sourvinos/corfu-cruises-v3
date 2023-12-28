using API.Infrastructure.Classes;

namespace API.Features.CoachRoutes {

    public class CoachRouteAutoCompleteVM : SimpleEntity {

        public string Abbreviation { get; set; }
        public bool IsActive { get; set; }

    }

}