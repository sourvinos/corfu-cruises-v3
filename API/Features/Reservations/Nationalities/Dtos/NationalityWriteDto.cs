using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Nationalities {

    public class NationalityWriteDto : IBaseEntity, IMetadata {

        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}