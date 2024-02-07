using API.Features.Reservations.ShipOwners;
using API.Infrastructure.Classes;

namespace API.Features.Reservations.Ships {

    public class ShipAutoCompleteVM : SimpleEntity {

        public ShipOwnerAutoCompleteVM ShipOwner { get; set; }
        public bool IsActive { get; set; }

    }

}