using System;

namespace API.Features.Billing.Invoices {

    public class InvoicePort {

        // PK
        public int Id { get; set; }
        // FKs
        public Guid InvoiceId { get; set; }
        public Guid PortId { get; set; }
        // Fields
        public int AdultsWithTransfer { get; set; }
        public int AdultsWithoutTransfer { get; set; }
        public int KidsWithTransfer { get; set; }
        public int KidsWithoutTransfer { get; set; }
        public decimal AdultsAmountWithTransfer { get; set; }
        public decimal AdultsAmountWithoutTransfer { get; set; }
        public decimal KidsAmountWithTransfer { get; set; }
        public decimal KidsAmountWithoutTransfer { get; set; }

    }

}