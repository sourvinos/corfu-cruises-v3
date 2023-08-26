﻿using API.Infrastructure.Interfaces;

namespace API.Features.Customers {

    public class CustomerReadDto : IMetadataRead {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string Phones { get; set; }
        public string PersonInCharge { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}