using System;

namespace Codes {

    public class TestCode {

        public int StatusCode { get; set; }

        // PK
        public Guid Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Batch { get; set; }
        public string LastDate { get; set; }
        public int LastNo { get; set; }
        public bool IsActive { get; set; }
        public string Customers { get; set; }
        public string Suppliers { get; set; }
        // myData
        public bool IsMyData { get; set; }
        public string Table8_1 { get; set; }
        public string Table8_8 { get; set; }
        public string Table8_9 { get; set; }
        // Metadata
        public string PutAt { get; set; }

    }

}