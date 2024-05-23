using System;
using API.Infrastructure.Classes;

namespace API.Features.RetailSales {

    public class RetailSaleReadDto {

        public int Id { get; set; }
        public Guid ReservationId { get; set; }
        public string Date { get; set; }
        public string TripDate { get; set; }
        public int InvoiceNo { get; set; }
        public RetailSaleReadDtoDocumentType DocumentType { get; set; }
        public SimpleEntity PaymentMethod { get; set; }
        public SimpleEntity ShipOwner { get; set; }
        public int Adults { get; set; }
        public decimal AdultsPrice { get; set; }
        public int Kids { get; set; }
        public decimal KidsPrice { get; set; }
        public int Free { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
        public string Passenger { get; set; }
        public string Remarks { get; set; }
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}