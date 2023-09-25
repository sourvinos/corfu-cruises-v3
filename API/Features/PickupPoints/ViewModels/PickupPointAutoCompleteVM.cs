using API.Features.Ports;
using API.Infrastructure.Classes;

namespace API.Features.PickupPoints {

    public class PickupPointAutoCompleteVM : SimpleEntity {

        public string ExactPoint { get; set; }
        public string Time { get; set; }
        public PortAutoCompleteVM Port { get; set; }
        public bool IsActive { get; set; }

    }

}