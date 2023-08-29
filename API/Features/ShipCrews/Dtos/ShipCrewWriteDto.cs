using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.ShipCrews {

    public class ShipCrewWriteDto : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // FK
        public int GenderId { get; set; }
        public int NationalityId { get; set; }
        public int ShipId { get; set; }
        //  Fields
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Birthdate { get; set; }
        public bool IsActive { get; set; }
        // Navigation
                public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}