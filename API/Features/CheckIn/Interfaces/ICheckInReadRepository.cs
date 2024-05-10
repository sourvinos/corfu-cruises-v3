using System.Threading.Tasks;
using API.Features.Reservations.Reservations;

namespace API.Features.CheckIn {

    public interface ICheckInReadRepository  {

        Task<Reservation> GetByRefNo(string refNo);
        Task<Reservation> GetByDate(string date, int destinationId, string lastname, string firstname);
        Task<Reservation> GetByIdAsync(string reservationId, bool includeTables);
        Task SendReservationToEmail(BoardingPassReservationVM reservation);

    }

}