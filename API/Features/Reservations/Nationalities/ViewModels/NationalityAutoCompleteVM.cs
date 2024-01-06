using API.Infrastructure.Classes;

namespace API.Features.Reservations.Nationalities {

    public class NationalityAutoCompleteVM : SimpleEntity {

        public string Code { get; set; }
        public bool IsActive { get; set; }

    }

}