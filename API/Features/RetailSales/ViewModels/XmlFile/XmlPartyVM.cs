namespace API.Features.RetailSales {

    public abstract class XmlPartyVM {

        public string VatNumber { get; set; }
        public string Country { get; set; }
        public int Branch { get; set; }
        public XmlAddressVM Address { get; set; }

    }

}