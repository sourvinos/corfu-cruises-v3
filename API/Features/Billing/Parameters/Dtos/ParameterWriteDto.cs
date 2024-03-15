using System;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Parameters {

    public class ParameterWriteDto : IMetadata {

        // PK
        public Guid Id { get; set; }
        // Fields
        public decimal VatPercent { get; set; }
        public int VatCategoryId { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}