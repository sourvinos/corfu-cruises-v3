using System;

namespace API.Features.Billing.TaxOffices {

    public class TaxOfficeAutoCompleteVM {

        public Guid Id { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

    }

}