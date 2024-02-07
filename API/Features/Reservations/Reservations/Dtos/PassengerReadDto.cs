using System;
using API.Features.Reservations.Nationalities;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Reservations {

    public class PassengerReadDto : IBaseEntity {

        // PK
        public int Id { get; set; }
        // FKs
        public Guid ReservationId { get; set; }
        // Fields
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Birthdate { get; set; }
        public string Remarks { get; set; }
        public string SpecialCare { get; set; }
        public bool IsBoarded { get; set; }
        // Navigation
        public NationalityAutoCompleteVM Nationality { get; set; }
        public SimpleEntity Gender { get; set; }

    }
 
}