using Infrastructure;

namespace Customers {

    public class TestCustomer : ITestEntity {

        public int StatusCode { get; set; }
        
        public int Id { get; set; }
        public string Description { get; set; }
        public string RowVersion { get; set; }

    }

}