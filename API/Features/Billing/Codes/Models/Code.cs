using System;
using API.Infrastructure.Interfaces;

namespace API.Features.Codes {

    public class Code : IMetadata {

        // PK
        public Guid Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Batch { get; set; }
        public DateTime LastDate { get; set; }
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
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}