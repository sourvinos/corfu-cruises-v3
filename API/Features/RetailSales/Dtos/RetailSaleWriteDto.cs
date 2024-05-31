using System;
using API.Infrastructure.Interfaces;

namespace API.Features.RetailSales {

    public class RetailSaleWriteDto : IMetadata {

        public int Id { get; set; }
        public Guid ReservationId { get; set; }
        public DateTime Date { get; set; }
        public int InvoiceNo { get; set; }
        public int DocumentTypeId { get; set; }
        public int PaymentMethodId { get; set; }
        public int ShipOwnerId { get; set; }
        public int Adults { get; set; }
        public decimal AdultsPrice { get; set; }
        public int Kids { get; set; }
        public decimal KidsPrice { get; set; }
        public int Free { get; set; }
        public decimal VatPercent { get; set; }
        public string Passenger { get; set; }
        public string Remarks { get; set; }
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}