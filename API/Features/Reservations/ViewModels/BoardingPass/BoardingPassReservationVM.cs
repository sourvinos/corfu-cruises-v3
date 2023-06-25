using System.Collections.Generic;
using API.Infrastructure.Classes;

namespace API.Features.Reservations {

    public class BoardingPassReservationVM {

        public string Date { get; set; }
        public string RefNo { get; set; }
        public string TicketNo { get; set; }
        public SimpleEntity Customer { get; set; }
        public SimpleEntity Destination { get; set; }
        public BoardingPassPickupPointVM PickupPoint { get; set; }
        public int TotalPax { get; set; }
        public string Email { get; set; }
        public string Remarks { get; set; }

        public List<BoardingPassPassengerVM> Passengers { get; set; }

    }

}