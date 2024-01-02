using System;

namespace API.Features.VatRegimes {

    public class VatRegimeAutoCompleteVM {

        public Guid Id { get; set; }
        public string Description { get; set; }
        public int HasVat { get; set; }
        public bool IsActive { get; set; }

    }

}