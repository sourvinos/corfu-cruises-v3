using API.Features.Billing.Transactions;
using API.Features.Reservations.Destinations;

namespace API.Features.Billing.Retail {

    public class Retail : TransactionsBase {

        public int DestinationId { get; set; }
        public int Adults { get; set; }
        public int Kids { get; set; }
        public int Free { get; set; }
        public int TotalPax { get; set; }
        public decimal AdultsPrice { get; set; }
        public decimal KidsPrice { get; set; }
        public decimal TotalAmouont { get; set; }
        public RetailAade Aade { get; set; }
        public Destination Destination { get; set; }

    }

}