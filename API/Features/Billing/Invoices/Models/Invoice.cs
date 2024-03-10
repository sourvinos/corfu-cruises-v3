using API.Features.Billing.Transactions;
using API.Features.Reservations.Destinations;
using API.Features.Reservations.Ships;
using System.Collections.Generic;

namespace API.Features.Billing.Invoices {

    public class Invoice : Transaction {

        public int? DestinationId { get; set; }
        public int? ShipId { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        // Child tables
        public InvoiceAade Aade { get; set; }
        public List<InvoicePort> InvoicesPorts { get; set; }
        // Navigation
        public Destination Destination { get; set; }
        public Ship Ship { get; set; }

    }

}