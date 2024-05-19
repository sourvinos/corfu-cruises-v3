using API.Features.Billing.Transactions;

namespace API.Features.Billing.Retail {

    public class RetailWriteDto : TransactionsBase {

        public int? DestinationId { get; set; }
        public int? ShipId { get; set; }

    }

}