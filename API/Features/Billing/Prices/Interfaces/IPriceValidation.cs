using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Prices {

    public interface IPriceValidation : IRepository<Price> {

        int IsValid(Price x, PriceWriteDto price);
    }

}