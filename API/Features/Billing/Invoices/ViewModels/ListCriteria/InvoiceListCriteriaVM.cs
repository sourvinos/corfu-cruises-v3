namespace API.Features.Billing.Invoices {

    public class InvoiceListCriteriaVM {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? CustomerId { get; set; }

    }

}