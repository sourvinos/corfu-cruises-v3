using System;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Transactions {

    public class TransactionWriteDto : IMetadata {

        // PK
        public Guid TransactionId { get; set; }
        // FKs
        public int CustomerId { get; set; }
        public int DocumentTypeId { get; set; }
        public int PaymentMethodId { get; set; }
        // Fields
        public string Date { get; set; }
        public int No { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}