using System;
using API.Features.Users;
using API.Infrastructure.Interfaces;

namespace API.Infrastructure.Parameters {

    public class Parameter : IBaseEntity {

        // PK
        public Guid Id { get; set; }
        // Fields
        public string ClosingTime { get; set; }
        public string LastUpdate { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }

    }

}