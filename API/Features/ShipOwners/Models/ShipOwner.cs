using System.Collections.Generic;
using API.Features.Ships;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.ShipOwners {

    public class ShipOwner : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string TaxNo { get; set; }
        public string City { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        // Navigation
                public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }
        public UserExtended User { get; set; }
        public List<Ship> Ships { get; set; }

    }

}