using API.Infrastructure.Classes;

namespace API.Features.Billing.Invoices {

    public class InvoiceViewerPartyVM {

        // PK
        public int Id { get; set; }
        // Fields
        public string FullDescription { get; set; }
        public string VatNumber { get; set; }
        public int Branch { get; set; }
        public string Profession { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        // Navigation
        public SimpleEntity Nationality { get; set; }
        public SimpleEntity TaxOffice { get; set; }

    }

}