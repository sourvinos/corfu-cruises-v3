using System.Collections.Generic;

namespace API.Features.Reservations {

    public interface IReservationCalendar {

        IEnumerable<ReservationCalendarGroupVM> GetForCalendar(string fromDate, string toDate);

    }

}