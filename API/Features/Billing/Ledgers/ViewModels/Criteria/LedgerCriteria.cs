namespace API.Features.Billing.Ledgers {

    public class LedgerCriteria {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int[] CustomerIds { get; set; }

    }

}