using API.Features.Customers;
using API.Features.Occupants;
using API.Features.Ports;
using API.Features.Registrars;
using API.Features.Reservations;
using API.Features.Schedules;
using API.Features.ShipCrews;
using API.Features.ShipOwners;
using API.Features.ShipRoutes;
using API.Features.Ships;
using API.Infrastructure.Auth;
using API.Infrastructure.Parameters;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace API.Features.Users {

    public class UserExtended : IdentityUser {

        // Fields
        public string Displayname { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsFirstFieldFocused { get; set; }
        public bool IsActive { get; set; }
        // FKs
        public int? CustomerId { get; set; }
        // Navigation
        public Customer Customer { get; set; }
        public List<Occupant> Occupants { get; set; }
        public List<Port> Ports { get; set; }
        public List<Registrar> Registrars { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<Schedule> Schedules { get; set; }
        public List<Ship> Ships { get; set; }
        public List<ShipCrew> ShipCrews { get; set; }
        public List<ShipOwner> ShipOwners { get; set; }
        public List<ShipRoute> ShipRoutes { get; set; }
        public List<Token> Tokens { get; set; }
        public List<Parameter> Parameters { get; set; }

    }

}