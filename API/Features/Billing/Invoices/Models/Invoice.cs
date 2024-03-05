using System;
using System.Collections.Generic;
using API.Features.Billing.DocumentTypes;
using API.Features.Billing.PaymentMethods;
using API.Features.Reservations.Customers;
using API.Features.Reservations.Destinations;
using API.Features.Reservations.Ships;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public class Invoice : IMetadata {

        // PK
        public Guid InvoiceId { get; set; }
        // FKs
        public int CustomerId { get; set; }
        public int? DestinationId { get; set; }
        public int DocumentTypeId { get; set; }
        public int PaymentMethodId { get; set; }
        public int? ShipId { get; set; }
        public int DiscriminatorId { get; set; }
        // Fields
        public DateTime Date { get; set; }
        public int InvoiceNo { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public string Remarks { get; set; }
        // Child tables
        public InvoiceAade Aade { get; set; }
        public List<InvoicePort> InvoicesPorts { get; set; }
        // Navigation
        public Customer Customer { get; set; }
        public Destination Destination { get; set; }
        public DocumentType DocumentType { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public Ship Ship { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}