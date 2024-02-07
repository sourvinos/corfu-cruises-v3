using API.Features.Reservations.Nationalities;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Customers {

    public class CustomerBrowserStorageVM : IBaseEntity {

        // PK
        public int Id { get; set; }
        // Fields
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public string TaxNo { get; set; }
        public int Branch { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public bool IsActive { get; set; }
        // Navigation
        public NationalityAutoCompleteVM Nationality { get; set; }

    }

}