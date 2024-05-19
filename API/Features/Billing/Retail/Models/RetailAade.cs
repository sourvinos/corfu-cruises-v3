using System;

namespace API.Features.Billing.Retail {

    public class RetailAade {

        public Guid InvoiceId { get; set; }
        public string Uid { get; set; }
        public string Mark { get; set; }
        public string MarkCancel { get; set; }
        public string QrUrl { get; set; }

    }

}