using Infrastructure;

namespace ShipOwners {

    public class TestShipOwner : ITestEntity {

        public int StatusCode { get; set; }
        
        public int Id { get; set; }
        public string Description { get; set; }
        public string RowVersion { get; set; }

    }

}