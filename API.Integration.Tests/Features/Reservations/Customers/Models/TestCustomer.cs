using Infrastructure;

namespace Customers {

    public class TestCustomer : ITestEntity {

        public int StatusCode { get; set; }

        public int Id { get; set; }
        public int TaxOfficeId { get; set; }
        public int VatRegimeId { get; set; }
        public int NationalityId { get; set; }
        public string Description { get; set; }
        public string TaxNo { get; set; }
        public decimal BalanceLimit { get; set; }
        public string PutAt { get; set; }

    }

}