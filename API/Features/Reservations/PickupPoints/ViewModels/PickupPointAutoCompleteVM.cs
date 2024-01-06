using API.Infrastructure.Classes;

namespace API.Features.Reservations.PickupPoints {

    public class PickupPointAutoCompleteVM : SimpleEntity {

        public string ExactPoint { get; set; }
        public string Time { get; set; }
        public SimpleEntity Port { get; set; }
        public bool IsActive { get; set; }

    }

}