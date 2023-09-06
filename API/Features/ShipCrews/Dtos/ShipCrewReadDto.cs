using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.ShipCrews {

    public class ShipCrewReadDto : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Birthdate { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // RowVersion
        public string RowVersion { get; set; }
        // Navigation
        public SimpleEntity Gender { get; set; }
        public SimpleEntity Nationality { get; set; }
        public SimpleEntity Ship { get; set; }

    }

}