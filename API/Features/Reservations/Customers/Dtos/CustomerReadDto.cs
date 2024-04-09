using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Customers {

    public class CustomerReadDto : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // FKs, Navigation
        public SimpleEntity Nationality { get; set; }
        public SimpleEntity TaxOffice { get; set; }
        public SimpleEntity VatRegime { get; set; }
        // Fields
        public string Description { get; set; }
        public string FullDescription { get; set; }
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
        public decimal BalanceLimit { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}