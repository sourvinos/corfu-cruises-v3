using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Ships {

    public class ShipWriteDto : IMetadataWrite {

        public int Id { get; set; }
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public int ShipOwnerId { get; set; }
        public string IMO { get; set; }
        public string Flag { get; set; }
        public string RegistryNo { get; set; }
        public string Manager { get; set; }
        public string ManagerInGreece { get; set; }
        public string Agent { get; set; }
        public bool IsActive { get; set; }
                public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }

    }

}