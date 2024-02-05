using API.Infrastructure.Classes;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwnerAutoCompleteVM : SimpleEntity {

        public string TaxNo { get; set; }
        public NationalityReadDto Nationality { get; set; }
        public int Branch { get; set; }
        public bool IsActive { get; set; }

    }

}