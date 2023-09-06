using System.Collections.Generic;
using API.Features.PickupPoints;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations {

    public class ReservationReadDto : IMetadata {

        // PK
        public string ReservationId { get; set; }
        // Fields
        public string Date { get; set; }
        public string RefNo { get; set; }
        public int Adults { get; set; }
        public int Kids { get; set; }
        public int Free { get; set; }
        public int TotalPax { get; set; }
        public string TicketNo { get; set; }
        public string Email { get; set; }
        public string Phones { get; set; }
        public string Remarks { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // RowVersion
        public string RowVersion { get; set; }
        //  Navigation
        public SimpleEntity Customer { get; set; }
        public SimpleEntity Destination { get; set; }
        public PickupPointAutoCompleteVM PickupPoint { get; set; }
        public SimpleEntity Driver { get; set; }
        public SimpleEntity Ship { get; set; }
        public List<PassengerReadDto> Passengers { get; set; }

    }

}