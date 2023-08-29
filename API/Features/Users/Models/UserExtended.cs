using API.Features.Customers;
using Microsoft.AspNetCore.Identity;

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

    }

}