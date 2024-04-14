namespace API.Features.Billing.Invoices {

    public class InvoiceViewerSummaryVM {

        public decimal NetAmount { get; set; }
        public decimal VatPercent { get; set; }
        public decimal VatAmount { get; set; }
        public decimal GrossAmount { get; set; }

    }

}