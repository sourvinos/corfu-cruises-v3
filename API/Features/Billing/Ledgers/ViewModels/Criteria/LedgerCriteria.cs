namespace API.Features.Billing.Ledgers {

    public class LedgerCriteria {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int CustomerId { get; set; }
        public int? ShipOwnerId { get; set; }

    }

}