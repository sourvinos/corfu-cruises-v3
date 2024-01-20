namespace VatRegimes {

    public class TestVatRegime {

        public int StatusCode { get; set; }

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public bool HasVat { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PutAt { get; set; }

    }

}