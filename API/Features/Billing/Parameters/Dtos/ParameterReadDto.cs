using System;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Parameters {

    public class ParameterReadDto : IMetadata {

        // PK
        public Guid Id { get; set; }
        // Fields
        public bool IsAadeLive { get; set; }
        public string AadeDemoUrl { get; set; }
        public string AadeDemoUsername { get; set; }
        public string AadeDemoApiKey { get; set; }
        public string AadeLiveUrl { get; set; }
        public string AadeLiveUsername { get; set; }
        public string AadeLiveApiKey { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}