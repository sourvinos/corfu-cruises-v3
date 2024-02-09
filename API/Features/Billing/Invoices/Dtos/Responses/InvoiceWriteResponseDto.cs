namespace API.Features.Billing.Invoices {

    public class InvoiceWriteResponseDto {

        public string Date { get; set; }
        public int No { get; set; }
        public int ShipId { get; set; }
        public int CounterPartId { get; set; }
        public int DocumentTypeId { get; set; }
        public int PaymentMethodId { get; set; }
        public string Currency { get; set; }
        public decimal NetAmount { get; set; }
        public int VatCategory { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }
 
    }

}