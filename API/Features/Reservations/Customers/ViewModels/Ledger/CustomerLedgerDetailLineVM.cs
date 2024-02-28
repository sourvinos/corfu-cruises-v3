namespace API.Features.Reservations.Customers {

    public class CustomerLedgerDetailLineVM {

        public string Date { get; set; }
        public int CustomerId { get; set; }
        public int DocumentTypeId { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public decimal Balance { get; set; }

    }

}