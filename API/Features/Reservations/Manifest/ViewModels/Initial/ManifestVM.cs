using System.Collections.Generic;
using API.Features.Reservations.Reservations;
using API.Features.Reservations.ShipCrews;

namespace API.Features.Reservations.Manifest {

    public class ManifestVM {

        public List<Passenger> Passengers { get; set; }
        public List<ShipCrew> Crew { get; set; }

    }

}