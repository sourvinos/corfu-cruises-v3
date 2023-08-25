using System;
using API.Features.Users;

namespace API.Infrastructure.Parameters {

    public class Parameter {

        // PK
        public Guid Id { get; set; }
        // Fields
        public string ClosingTime { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        public string LastUpdate { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }
 
    }

}