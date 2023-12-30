using API.Infrastructure.Interfaces;

namespace API.Features.Prices {

    public interface IPriceCloneRepository : IRepository<Price> {

        PriceWriteDto BuildPriceWriteDto(int customerId, Price price);
        void ClonePricesAsync(PriceCloneCriteria criteria);

    }

}