using API.Infrastructure.Interfaces;

namespace API.Features.Destinations {

    public class DestinationWriteDto : IBaseEntity {

        public int Id { get; set; }
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }

    }

}