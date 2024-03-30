namespace API.Features.Billing.Invoices {

    public class XmlPartyVM {

        public string VatNumber { get; set; }
        public string Country { get; set; }
        public int Branch { get; set; }
        public XmlAddressVM Address { get; set; }

    }

}