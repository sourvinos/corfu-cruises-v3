using System;

namespace API.Features.Billing.Invoices {

    public class InvoiceReadAadeDto {

        // PK
        public int Id { get; set; }
        // FKs
        public Guid InvoiceId { get; set; }
        // Fields
        public string Uid { get; set; }
        public string Mark { get; set; }
        public string MarkCancel { get; set; }
        public string QrUrl { get; set; }

    }

}