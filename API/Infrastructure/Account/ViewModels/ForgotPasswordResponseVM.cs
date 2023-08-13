namespace API.Infrastructure.Account {

    public class ForgotPasswordResponseVM {

        public string Username { get; set; }
        public string Displayname { get; set; }
        public string Email { get; set; }
        public string ReturnUrl { get; set; }
        public string CompanyPhones { get; set; }
        public string LogoTextBase64 { get; set; }

    }

}