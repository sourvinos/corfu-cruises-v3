﻿using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Genders {

    public class GenderWriteDto : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public bool IsActive { get; set; }
        // Navigation
                public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }

    }

}