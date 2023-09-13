using API.Infrastructure.Interfaces;

namespace API.Features.ShipOwners {

    public interface IShipOwnerValidation : IRepository<ShipOwner> {

        int IsValid(ShipOwner x, ShipOwnerWriteDto ship);

    }

}