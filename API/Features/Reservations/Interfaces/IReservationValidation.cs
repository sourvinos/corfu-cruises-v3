using API.Features.Schedules;

namespace API.Features.Reservations {

    public interface IReservationValidation {

        bool IsUserOwner(int customerId);
        bool IsKeyUnique(ReservationWriteDto reservation);
        int GetPortIdFromPickupPointId(ReservationWriteDto reservation);
        int OverbookedPax(string date, int destinationId);
        int IsValid(Reservation x, ReservationWriteDto reservation, IScheduleRepository scheduleRepo);

    }

}