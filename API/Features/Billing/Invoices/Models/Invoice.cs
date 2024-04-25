using API.Features.Billing.Transactions;
using API.Features.Reservations.Destinations;
using API.Features.Reservations.Ships;
using System.Collections.Generic;

namespace API.Features.Billing.Invoices {

    public class Invoice : TransactionsBase {

        public int? DestinationId { get; set; }
        public int? ShipId { get; set; }
        public InvoiceAade Aade { get; set; }
        public List<InvoicePort> InvoicesPorts { get; set; }
        public Destination Destination { get; set; }
        public Ship Ship { get; set; }

    }

}