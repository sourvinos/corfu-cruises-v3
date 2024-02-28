using System.Collections.Generic;

namespace API.Features.Reservations.Customers {

    public class CustomerLedgerVM {

        public string Date { get; set; }
        public int SupplierId { get; set; }
        public int CodeId { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public decimal Balance { get; set; }
        public PreviousPeriod Previous { get; set; }
        public IList<CustomerLedgerDetailLineVM> Requested { get; } = new List<CustomerLedgerDetailLineVM>();

    }

}
