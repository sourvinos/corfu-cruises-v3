namespace API.Features.Billing.BalanceSheet {

    public class BalanceSheetCriteria {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? ShipOwnerId { get; set; }

    }

}