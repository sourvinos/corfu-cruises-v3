using API.Features.Billing.DocumentTypes;
using API.Features.Billing.PaymentMethods;
using API.Features.Reservations.Reservations;
using API.Features.Reservations.ShipOwners;
using API.Infrastructure.Interfaces;
using System;

namespace API.Features.RetailSales {

    public class RetailSale : IMetadata {

        // PK
        public int Id { get; set; }
        // FKs
        public Guid ReservationId { get; set; }
        public int DocumentTypeId { get; set; }
        public int PaymentMethodId { get; set; }
        public int ShipOwnerId { get; set; }
        // Fields
        public DateTime Date { get; set; }
        public int InvoiceNo { get; set; }
        public int Adults { get; set; }
        public decimal AdultsPrice { get; set; }
        public int Kids { get; set; }
        public decimal KidsPrice { get; set; }
        public int Free { get; set; }
        public int TotalPax { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public string Passenger { get; set; }
        public string Remarks { get; set; }
        public bool IsEmailSent { get; set; }
        public bool IsCancelled { get; set; }
        // Navigation
        public Reservation Reservation { get; set; }
        public DocumentType DocumentType { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public ShipOwner ShipOwner { get; set; }
        // Aade
        public string Uid { get; set; }
        public string Mark { get; set; }
        public string MarkCancel { get; set; }
        public string QrUrl { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}