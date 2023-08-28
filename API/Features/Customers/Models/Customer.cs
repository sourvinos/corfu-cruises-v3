using System.Collections.Generic;
using API.Features.Reservations;
using API.Features.Users;
using API.Infrastructure.Interfaces;

namespace API.Features.Customers {

    public class Customer : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string Phones { get; set; }
        public string PersonInCharge { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        // Navigation
        public UserExtended User { get; set; }
        public List<Reservation> Reservations { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }

    }

}