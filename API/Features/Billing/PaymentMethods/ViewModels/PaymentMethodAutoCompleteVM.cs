using System;

namespace API.Features.PaymentMethods {

    public class PaymentMethodAutoCompleteVM {

        public Guid Id { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

    }

}