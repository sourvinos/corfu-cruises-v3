namespace API.Features.Billing.Invoices {

    public class InvoiceRowVM {

        public int LineNumber { get; set; }
        public decimal NetValue { get; set; }
        public int VatCategory { get; set; }
        public decimal VatAmount { get; set; }

    }

}