using System;
using System.Collections.Generic;
using System.Linq;
using API.Features.Reservations.Reservations;
using API.Infrastructure.Classes;
using Microsoft.EntityFrameworkCore;

namespace API.Features.CheckIn {

    public class CheckInUpdateRepository : ICheckInUpdateRepository {

        protected readonly AppDbContext context;

        public CheckInUpdateRepository(AppDbContext context) {
            this.context = context;
        }

        public Reservation Update(Guid reservationId, Reservation reservation) {
            using var transaction = context.Database.BeginTransaction();
            AddPassengers(reservation.Passengers);
            UpdatePassengers(reservation.Passengers);
            DeletePassengers(reservationId, reservation.Passengers);
            context.SaveChanges();
            transaction.Commit();
            return reservation;
        }

        private void AddPassengers(List<Passenger> passengers) {
            if (passengers.Any(x => x.Id == 0)) {
                context.Passengers.AddRange(passengers.Where(x => x.Id == 0));
            }
        }

        private void UpdatePassengers(List<Passenger> passengers) {
            context.Passengers.UpdateRange(passengers.Where(x => x.Id != 0));
        }

        private void DeletePassengers(Guid reservationId, List<Passenger> passengers) {
            var existingPassengers = context.Passengers
                .AsNoTracking()
                .Where(x => x.ReservationId == reservationId)
                .ToList();
            var passengersToUpdate = passengers
                .Where(x => x.Id != 0)
                .ToList();
            var passengersToDelete = existingPassengers
                .Except(passengersToUpdate, new PassengerComparerById())
                .ToList();
            context.Passengers.RemoveRange(passengersToDelete);
        }

        private class PassengerComparerById : IEqualityComparer<Passenger> {
            public bool Equals(Passenger x, Passenger y) {
                return x.Id == y.Id;
            }
            public int GetHashCode(Passenger x) {
                return x.Id.GetHashCode();
            }
        }
 
    }

}