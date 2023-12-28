using System.Threading.Tasks;
using API.Features.Schedules;

namespace API.Features.Reservations {

    public interface IReservationValidation {

        bool IsUserOwner(int customerId);
        Task<bool> IsKeyUnique(ReservationWriteDto reservation);
        int GetPortIdFromPickupPointId(ReservationWriteDto reservation);
        int OverbookedPax(string date, int destinationId);
        Task<int> IsValidAsync(Reservation x, ReservationWriteDto reservation, IScheduleRepository scheduleRepo);

    }

}