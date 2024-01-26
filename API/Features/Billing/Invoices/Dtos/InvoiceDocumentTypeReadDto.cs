namespace API.Features.Billing.Invoices {

    public class InvoiceDocumentTypeReadDto {

        // PK
        public int Id { get; set; }
        // Fields
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public string Batch { get; set; }
    }

}