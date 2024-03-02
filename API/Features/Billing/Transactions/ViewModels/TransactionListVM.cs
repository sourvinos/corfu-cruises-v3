using API.Infrastructure.Classes;

namespace API.Features.Billing.Transactions {

    public class TransactionListVM {

        public string TransactionId { get; set; }
        public string Date { get; set; }
        public int No { get; set; }
        public SimpleEntity Customer { get; set; }
        public SimpleEntity DocumentType { get; set; }
        public SimpleEntity PaymentMethod { get; set; }
        public decimal GrossAmount { get; set; }

    }

}