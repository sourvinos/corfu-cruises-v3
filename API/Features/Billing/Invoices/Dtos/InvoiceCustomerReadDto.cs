using API.Infrastructure.Classes;

namespace API.Features.Billing.Invoices {

    public class InvoiceCustomerReadDto : SimpleEntity {

        public string TaxNo { get; set; }
        public string Email { get; set; }

    }

}