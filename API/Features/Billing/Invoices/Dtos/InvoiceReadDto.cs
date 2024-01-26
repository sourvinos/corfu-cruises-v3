using System;
using System.Collections.Generic;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public class InvoiceReadDto : IMetadata {

        // PK
        public Guid InvoiceId { get; set; }
        // Fields
        public DateTime Date { get; set; }
        public int No { get; set; }
        public int Adults { get; set; }
        public int Kids { get; set; }
        public int Free { get; set; }
        public int TotalPax { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        // Child tables
        public InvoiceReadAadeDto Aade { get; set; }
        public List<InvoicePortReadDto> Ports { get; set; }
        // Navigation
        public InvoiceCustomerReadDto Customer { get; set; }
        public SimpleEntity Destination { get; set; }
        public InvoiceDocumentTypeReadDto DocumentType { get; set; }
        public SimpleEntity PaymentMethod { get; set; }
        public SimpleEntity Ship { get; set; }
        public SimpleEntity Port { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}