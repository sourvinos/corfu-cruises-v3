using API.Infrastructure.Interfaces;

namespace API.Features.Registrars {

    public class RegistrarWriteDto : IBaseEntity {

        public int Id { get; set; }
        public int ShipId { get; set; }
        public string Fullname { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string Address { get; set; }
        public bool IsPrimary { get; set; }
        public bool IsActive { get; set; }
        public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }

    }

}