using System;

namespace API.Features.Billing.Retail {

    public class RetailFormAadeVM {

        public Guid InvoiceId { get; set; }
        public string UId { get; set; }
        public string Mark { get; set; }
        public string MarkCancel { get; set; }
        public string QrUrl { get; set; }

    }

}