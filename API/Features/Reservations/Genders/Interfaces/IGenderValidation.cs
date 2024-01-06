using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Genders {

    public interface IGenderValidation : IRepository<Gender> {

        int IsValid(Gender x, GenderWriteDto gender);

    }

}