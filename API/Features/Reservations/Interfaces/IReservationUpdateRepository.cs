using System;
using API.Infrastructure.Interfaces;
using API.Infrastructure.Responses;

namespace API.Features.Reservations {

    public interface IReservationUpdateRepository : IRepository<Reservation> {

        Reservation Update(Guid reservationId, Reservation reservation);
        void AssignToDriver(int driverId, string[] ids);
        void AssignToShip(int shipId, string[] ids);
        string AssignRefNoToNewDto(ReservationWriteDto reservation);
 
    }

}