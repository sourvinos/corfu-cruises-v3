using API.Infrastructure.Interfaces;

namespace API.Features.Drivers {

    public interface IDriverValidation : IRepository<Driver> {

        int IsValid(Driver x, DriverWriteDto gender);

    }

}