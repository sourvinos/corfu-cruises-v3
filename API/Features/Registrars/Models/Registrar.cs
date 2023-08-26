using API.Features.Ships;
using API.Features.Users;
using API.Infrastructure.Interfaces;

namespace API.Features.Registrars {

    public class Registrar : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // FKs
        public int ShipId { get; set; }
        // Fields
        public string Fullname { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string Address { get; set; }
        public bool IsPrimary { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }
        // Navigation
        public Ship Ship { get; set; }
        public UserExtended User { get; set; }

    }

}