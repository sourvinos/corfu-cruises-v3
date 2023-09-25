using API.Infrastructure.Classes;

namespace API.Features.Ports {

    public class PortAutoCompleteVM : SimpleEntity {

        public string Abbreviation { get; set; }
        public bool IsActive { get; set; }

    }

}