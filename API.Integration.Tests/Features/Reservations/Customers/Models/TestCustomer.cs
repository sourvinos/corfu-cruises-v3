using Infrastructure;

namespace Customers {

    public class TestCustomer : IPartyType {

        public int StatusCode { get; set; }

        public int Id { get; set; }
        public int NationalityId { get; set; }
        public int TaxOfficeId { get; set; }
        public int VatRegimeId { get; set; }
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public string VatNumber { get; set; }
        public int Branch { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Phones { get; set; }
        public string PersonInCharge { get; set; }
        public string Email { get; set; }
        public decimal BalanceLimit { get; set; }
        public bool IsActive { get; set; }
        public string PutAt { get; set; }
 
    }

}