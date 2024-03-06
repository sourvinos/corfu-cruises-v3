using System;

namespace Transactions {

    public class TestTransaction {

        public int StatusCode { get; set; }

        // PK
        public Guid? InvoiceId { get; set; }
        // FKs
        public int CustomerId { get; set; }
        public int DocumentTypeId { get; set; }
        public int PaymentMethodId { get; set; }
        // Fields
        public string Date { get; set; }
        public int InvoiceNo { get; set; }
        public decimal GrossAmount { get; set; }

    }

}