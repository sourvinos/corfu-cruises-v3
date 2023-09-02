using System;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations {

    public class PassengerWriteDto : IBaseEntity {

        // PK
        public int Id { get; set; }
        // FKs
        public Guid? ReservationId { get; set; }
        public int GenderId { get; set; }
        public int NationalityId { get; set; }
        // Fields
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Birthdate { get; set; }
        public string SpecialCare { get; set; }
        public string Remarks { get; set; }
        public bool IsBoarded { get; set; }

    }

}