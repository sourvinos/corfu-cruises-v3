using System.Collections.Generic;
using API.Features.Registrars;
using API.Features.Reservations;
using API.Features.ShipCrews;
using API.Features.ShipOwners;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Ships {

    public class Ship : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // FKs
        public int ShipOwnerId { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public string IMO { get; set; }
        public string Flag { get; set; }
        public string RegistryNo { get; set; }
        public string Manager { get; set; }
        public string ManagerInGreece { get; set; }
        public string Agent { get; set; }
        public bool IsActive { get; set; }
        // Navigation
                public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }
        public ShipOwner ShipOwner { get; set; }
        public UserExtended User { get; set; }
        public List<ShipCrew> ShipCrews { get; set; }
        public List<Registrar> Registrars { get; set; }
        public List<Reservation> Reservations { get; set; }

    }

}