using API.Infrastructure.Classes;

namespace API.Features.Billing.Invoices {

    public class InvoiceListCriteriaVM {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public SimpleEntity? Customer { get; set; }

    }

}