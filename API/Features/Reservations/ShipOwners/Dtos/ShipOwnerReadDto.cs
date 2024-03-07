using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwnerReadDto : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string VatNumber { get; set; }
        public int Branch { get; set; }
        public string Profession { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string PersonInCharge { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        // myData
        public string DemoUrl { get; set; }
        public string DemoUsername { get; set; }
        public string DemoPassword { get; set; }
        public string LiveUrl { get; set; }
        public string LiveUsername { get; set; }
        public string LivePassword { get; set; }
        public bool IsDemoMyData { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public SimpleEntity Nationality { get; set; }
        public SimpleEntity TaxOffice { get; set; }
        public SimpleEntity VatRegime { get; set; }

    }

}