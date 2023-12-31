using System;

namespace API.Features.TaxOffices {

    public class TaxOfficeListVM {

        public Guid Id { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

    }

}