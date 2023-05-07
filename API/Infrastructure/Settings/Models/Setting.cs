using System;
using API.Features.Users;
using API.Infrastructure.Interfaces;

namespace API.Infrastructure.Settings {

    public class Setting : IBaseEntity {

        // PK
        public Guid Id { get; set; }
        // Fields
        public string CompanyName { get; set; }
        public string ClosingTime { get; set; }
        public string LastUpdate { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public UserExtended User { get; set; }

    }

}