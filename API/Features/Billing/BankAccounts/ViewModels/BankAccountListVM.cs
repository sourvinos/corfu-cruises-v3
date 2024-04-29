using API.Infrastructure.Classes;

namespace API.Features.Billing.BankAccounts {

    public class BankAccountListVM {

        public int Id { get; set; }
        public SimpleEntity ShipOwner { get; set; }
        public SimpleEntity Bank { get; set; }
        public string Iban { get; set; }
        public bool IsActive { get; set; }

    }

}