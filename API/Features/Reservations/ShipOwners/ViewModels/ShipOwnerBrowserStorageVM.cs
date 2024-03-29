using API.Features.Reservations.Nationalities;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwnerBrowserStorageVM : IBaseEntity {

        // PK
        public int Id { get; set; }
        // Navigation
        public NationalityAutoCompleteVM Nationality { get; set; }
        // Fields
        public string Description { get; set; }
        public string TaxOffice { get; set; }
        public string VatNumber { get; set; }
        public int Branch { get; set; }
        public string Profession { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        public string Url { get; set; }
        public string Username { get; set; }
        public string SubscriptionKey { get; set; }
        public bool IsActive { get; set; }

    }

}