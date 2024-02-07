using API.Features.Billing.TaxOffices;
using API.Features.Billing.VatRegimes;
using API.Features.Reservations.Nationalities;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwner : IPartyType {

        // PK
        public int Id { get; set; }
        // FKs
        public int NationalityId { get; set; }
        public int TaxOfficeId { get; set; }
        public int VatRegimeId { get; set; }
        // Fields
        public string Description { get; set; }
        public string TaxNo { get; set; }
        public int Branch { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Phones { get; set; }
        public string PersonInCharge { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public Nationality Nationality { get; set; }
        public TaxOffice TaxOffice { get; set; }
        public VatRegime VatRegime { get; set; }

    }


}