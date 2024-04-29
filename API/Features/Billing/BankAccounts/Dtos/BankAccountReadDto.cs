using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.BankAccounts {

    public class BankAccountReadDto : IMetadata {

        // PK
        public int Id { get; set; }
        // FKs
        public int BankId { get; set; }
        public int ShipOwnerId { get; set; }
        // Fields
        public string Iban { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public SimpleEntity Bank { get; set; }
        public SimpleEntity ShipOwner { get; set; }

    }

}