using API.Infrastructure.Interfaces;

namespace API.Features.Prices {

    public interface IPriceValidation : IRepository<Price> {

        int IsValid(Price x, PriceWriteDto price);
    }

}