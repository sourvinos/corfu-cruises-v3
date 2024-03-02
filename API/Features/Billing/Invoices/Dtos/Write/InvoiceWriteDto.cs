using System;
using System.Collections.Generic;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public class InvoiceWriteDto : IMetadata {

        // PK
        public Guid InvoiceId { get; set; }
        // FKs
        public int CustomerId { get; set; }
        public int? DestinationId { get; set; }
        public int DocumentTypeId { get; set; }
        public int PaymentMethodId { get; set; }
        public int? ShipId { get; set; }
        // Fields
        public string Date { get; set; }
        public int No { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Child tables
        public List<InvoicePortWriteDto> InvoicesPorts { get; set; }

    }

}