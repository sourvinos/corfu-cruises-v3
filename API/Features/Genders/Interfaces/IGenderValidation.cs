using API.Infrastructure.Interfaces;

namespace API.Features.Genders {

    public interface IGenderValidation : IRepository<Gender> {

        int IsValid(Gender x, GenderWriteDto gender);

    }

}