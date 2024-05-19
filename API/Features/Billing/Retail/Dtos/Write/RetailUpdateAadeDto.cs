using System;

namespace API.Features.Billing.Retail {

    public class RetailUpdateAadeDto {

        // FKs
        public Guid InvoiceId { get; set; }
        // Fields
        public string Uid { get; set; }
        public string Mark { get; set; }
        public string MarkCancel { get; set; }
        public string QrUrl { get; set; }

    }

}