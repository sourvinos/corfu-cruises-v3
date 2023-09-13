using API.Infrastructure.Interfaces;

namespace API.Features.Destinations {

    public interface IDestinationValidation : IRepository<Destination> {

        int IsValid(Destination x, DestinationWriteDto destination);

    }

}