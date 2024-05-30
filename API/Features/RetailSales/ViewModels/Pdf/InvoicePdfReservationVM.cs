namespace API.Features.RetailSales {

    public class InvoicePdfReservationVM {

        public string ReservationId { get; set; }
        public string Date { get; set; }
        public string RefNo { get; set; }
        public string TicketNo { get; set; }
        public string Customer { get; set; }
        public string Destination { get; set; }
        public string PickupPoint { get; set; }
        public string ExactPoint { get; set; }
        public string Time { get; set; }
        public string Remarks { get; set; }

    }

}