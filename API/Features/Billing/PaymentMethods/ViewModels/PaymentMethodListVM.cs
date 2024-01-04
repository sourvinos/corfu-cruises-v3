using System;

namespace API.Features.PaymentMethods {

    public class PaymentMethodListVM {

        public Guid Id { get; set; }
        public string Description { get; set; }
        public bool IsCash { get; set; }
        public bool IsActive { get; set; }

    }

}