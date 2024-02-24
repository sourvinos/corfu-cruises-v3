using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.CrewSpecialties {

    public interface ICrewSpecialtyValidation : IRepository<CrewSpecialty> {

        int IsValid(CrewSpecialty x, CrewSpecialtyWriteDto gender);

    }

}