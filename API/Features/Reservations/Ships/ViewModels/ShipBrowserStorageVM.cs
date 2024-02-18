using API.Features.Reservations.ShipOwners;
using API.Infrastructure.Classes;

namespace API.Features.Reservations.Ships {

    public class ShipBrowserStorageVM : SimpleEntity {

        public ShipOwnerBrowserStorageVM ShipOwner { get; set; }
        public bool IsActive { get; set; }

    }

}