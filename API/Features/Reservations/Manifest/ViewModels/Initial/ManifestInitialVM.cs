using System.Collections.Generic;
using API.Features.Reservations.Destinations;
using API.Features.Reservations.Ports;
using API.Features.Reservations.Reservations;
using API.Features.Reservations.ShipRoutes;
using API.Features.Reservations.Ships;

namespace API.Features.Reservations.Manifest {

    public class ManifestInitialVM {

        public string Date { get; set; }
        public Destination Destination { get; set; }
        public Port Port { get; set; }
        public Ship Ship { get; set; }
        public ShipRoute ShipRoute { get; set; }
        public List<Passenger> Passengers { get; set; }

    }

}