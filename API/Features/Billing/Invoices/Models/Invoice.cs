using API.Features.Billing.Transactions;
using API.Features.Reservations.Destinations;
using API.Features.Reservations.Ships;
using System.Collections.Generic;

namespace API.Features.Billing.Invoices {

    public class Invoice : TransactionsBase {

        // FKs
        public int? DestinationId { get; set; }
        public int? ShipId { get; set; }
        // Child Tables
        public InvoiceAade Aade { get; set; }
        public List<InvoicePort> InvoicesPorts { get; set; }
        // Navigation
        public Destination Destination { get; set; }
        public Ship Ship { get; set; }

    }

}