namespace API.Features.Billing.VatRegimes {

    public class VatRegimeListVM {

        public int Id { get; set; }
        public string Description { get; set; }
        public int HasVat { get; set; }
        public bool IsActive { get; set; }

    }

}