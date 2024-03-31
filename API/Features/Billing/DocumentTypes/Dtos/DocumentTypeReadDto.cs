using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeReadDto : IMetadata {

        // PK
        public int Id { get; set; }
        // FKs
        public SimpleEntity ShipOwner { get; set; }
        // Fields
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public string Batch { get; set; }
        public string LastDate { get; set; }
        public int LastNo { get; set; }
        public string Customers { get; set; }
        public string Suppliers { get; set; }
        public int DiscriminatorId { get; set; }
        public bool IsActive { get; set; }
        public bool IsMyData { get; set; }
        public string Table8_1 { get; set; }
        public string Table8_8 { get; set; }
        public string Table8_9 { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}