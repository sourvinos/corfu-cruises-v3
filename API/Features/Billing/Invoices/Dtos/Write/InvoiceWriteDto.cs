using System.Collections.Generic;
using API.Features.Billing.Transactions;

namespace API.Features.Billing.Invoices {

    public class InvoiceWriteDto : Transaction {

        public int? DestinationId { get; set; }
        public int? ShipId { get; set; }
        // Fields
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        // Child tables
        public List<InvoicePortWriteDto> InvoicesPorts { get; set; }

    }

}