using API.Features.Reservations.Nationalities;
using API.Infrastructure.Classes;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwnerAutoCompleteVM : SimpleEntity {

        public string TaxNo { get; set; }
        public NationalityAutoCompleteVM Nationality { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public int Branch { get; set; }
        public bool IsActive { get; set; }

    }

}