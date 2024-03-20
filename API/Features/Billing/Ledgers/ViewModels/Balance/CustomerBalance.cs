using API.Infrastructure.Classes;

namespace API.Features.Billing.Ledgers {

    public class CustomerBalance : SimpleEntity {

        public decimal Balance { get; set; }

    }

}