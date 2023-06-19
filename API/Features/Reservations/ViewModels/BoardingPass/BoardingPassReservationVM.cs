using System.Collections.Generic;
using API.Infrastructure.Classes;

namespace API.Features.Reservations {

    public class BoardingPassReservationVM {

        public string Date { get; set; }
        public string RefNo { get; set; }
        public SimpleEntity Customer { get; set; }
        // public string Destination { get; set; }
        // public string PickupPoint { get; set; }
        // public int Adults { get; set; }
        // public int Kids { get; set; }
        // public int Free { get; set; }
        // public int TotalPax { get; set; }
        // public string TicketNo { get; set; }
        public string Email { get; set; }
        // public string Phones { get; set; }
        // public string Remarks { get; set; }

        // public IEnumerable<BoardingPassPassengerVM> Passengers { get; set; }

    }

}