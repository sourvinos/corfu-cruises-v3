using API.Infrastructure.Classes;

namespace API.Features.Billing.Invoices {

    public class InvoiceViewerCustomerBalanceVM : SimpleEntity {

        public BalanceVM Balance { get; set; }

    }

}