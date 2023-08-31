using API.Features.Customers;
using API.Infrastructure.Auth;
using API.Infrastructure.Parameters;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace API.Features.Users {

    public class UserExtended : IdentityUser {

        // Fields
        public string Displayname { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsFirstFieldFocused { get; set; }
        public bool IsActive { get; set; }
        // FKs
        public int? CustomerId { get; set; }
        // Navigation
        public Customer Customer { get; set; }
        public List<Token> Tokens { get; set; }
        public List<Parameter> Parameters { get; set; }

    }

}