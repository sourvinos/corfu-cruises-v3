using System;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Reservations {

    public interface IReservationUpdateRepository : IRepository<Reservation> {

        Reservation Update(Guid id, Reservation reservation);
        void AssignToDriver(int driverId, string[] ids);
        void AssignToPort(int portId, string[] ids);
        void AssignToShip(int shipId, string[] ids);
        string AssignRefNoToNewDto(ReservationWriteDto reservation);
        void DeleteRange(string[] ids);

    }

}