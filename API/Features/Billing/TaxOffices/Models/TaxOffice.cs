using System;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.TaxOffices {

    public class TaxOffice : IMetadata {

        // PK
        public Guid Id { get; set; }
        // Fields
        public string Description { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}