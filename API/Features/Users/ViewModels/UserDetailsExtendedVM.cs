namespace API.Features.Users {

    public class UserDetailsExtendedVM : UserDetailsVM {

        public string Username { get; set; }
        public string Displayname { get; set; }
        public string CompanyPhones { get; set; }
        public string LogoTextBase64 { get; set; }
        public string Url { get; set; }
        public string Subject { get; set; }

    }

}