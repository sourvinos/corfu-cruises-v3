using API.Infrastructure.Interfaces;

namespace API.Features.ShipRoutes {

    public interface IShipRouteValidation : IRepository<ShipRoute> {

        int IsValid(ShipRoute x, ShipRouteWriteDto ship);

    }

}