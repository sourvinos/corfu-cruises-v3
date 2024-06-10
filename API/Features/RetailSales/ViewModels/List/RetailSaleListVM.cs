using API.Infrastructure.Classes;

namespace API.Features.RetailSales {

    public class RetailSaleListVM {

        public int Id { get; set; }
        public string ReservationId { get; set; }
        public string Date { get; set; }
        public string RefNo { get; set; }
        public int InvoiceNo { get; set; }
        public SimpleEntity Customer { get; set; }
        public SimpleEntity Destination { get; set; }
        public SimpleEntity DocumentType { get; set; }
        public SimpleEntity ShipOwner { get; set; }
        public decimal GrossAmount { get; set; }
        public bool IsEmailSent { get; set; }
        public RetailSaleListAadeVM Aade { get; set; }
    }

}