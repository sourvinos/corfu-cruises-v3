using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Destinations {

    public class DestinationWriteDto : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // Fields
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        // Navigation
                public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}