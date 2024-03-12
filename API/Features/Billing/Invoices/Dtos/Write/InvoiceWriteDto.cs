using System.Collections.Generic;
using API.Features.Billing.Transactions;

namespace API.Features.Billing.Invoices {

    public class InvoiceWriteDto : TransactionBase {

        public int? DestinationId { get; set; }
        public int? ShipId { get; set; }
        public List<InvoicePortWriteDto> InvoicesPorts { get; set; }

    }

}