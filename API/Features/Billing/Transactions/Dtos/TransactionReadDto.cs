using System;
using API.Features.Billing.Invoices;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Transactions {

    public class TransactionReadDto : IMetadata {

        // PK
        public string InvoiceId { get; set; }
        // FKs
        public int CustomerId { get; set; }
        public int DocumentTypeId { get; set; }
        public int PaymentMethodId { get; set; }
        // Fields
        public DateTime Date { get; set; }
        public int No { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        // Navigation
        public SimpleEntity Customer { get; set; }
        public DocumentTypeVM DocumentType { get; set; }
        public SimpleEntity PaymentMethod { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}