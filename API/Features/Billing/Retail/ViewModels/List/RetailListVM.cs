using API.Infrastructure.Classes;

namespace API.Features.Billing.Retail {

    public class RetailListVM {

        public string InvoiceId { get; set; }
        public string Date { get; set; }
        public int InvoiceNo { get; set; }
        public SimpleEntity Customer { get; set; }
        public SimpleEntity Destination { get; set; }
        public DocumentTypeVM DocumentType { get; set; }
        public SimpleEntity ShipOwner { get; set; }
        public decimal GrossAmount { get; set; }
        public bool IsEmailSent { get; set; }
        public RetailListAadeVM Aade { get; set; }

    }

}