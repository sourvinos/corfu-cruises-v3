namespace API.Features.Billing.Invoices {

    public class PartyVM {

        public string VatNumber { get; set; }
        public string Country { get; set; }
        public int Branch { get; set; }
        public AddressVM Address { get; set; }

    }

}