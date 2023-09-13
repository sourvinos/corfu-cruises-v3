using API.Infrastructure.Interfaces;

namespace API.Features.Nationalities {

    public interface INationalityValidation : IRepository<Nationality> {

        int IsValid(Nationality x, NationalityWriteDto nationality);

    }

}