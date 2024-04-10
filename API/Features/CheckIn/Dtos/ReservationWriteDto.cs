using System;
using System.Collections.Generic;

namespace API.Features.CheckIn {

    public class ReservationWriteDto {

        // PK
        public Guid ReservationId { get; set; }
        // Fks
        public int DestinationId { get; set; }
        public int PickupPointId { get; set; }
        public int PortId { get; set; }
        // Fields
        public string Date { get; set; }
        // Navigation
        public List<PassengerWriteDto> Passengers { get; set; }

    }

}