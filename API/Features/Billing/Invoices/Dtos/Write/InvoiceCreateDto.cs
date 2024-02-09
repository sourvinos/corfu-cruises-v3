namespace API.Features.Billing.Invoices {

    public class InvoiceCreateDto : InvoiceWriteDto {

        public InvoiceAade Aade { get; set; } = new InvoiceAade();

    }

}