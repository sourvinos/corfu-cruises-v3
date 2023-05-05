using System.Threading.Tasks;
using API.Features.Reservations;
using API.Infrastructure.Interfaces;

namespace API.Features.CheckIn {

    public interface ICheckInReadRepository : IRepository<Reservation> {

        Task<Reservation> GetByRefNoAsync(string refNo);
        Task<Reservation> GetByDateAsync(string date, int destinationId, string lastname, string firstname);
        Task<Reservation> GetByIdAsync(string reservationId, bool includeTables);

    }

}