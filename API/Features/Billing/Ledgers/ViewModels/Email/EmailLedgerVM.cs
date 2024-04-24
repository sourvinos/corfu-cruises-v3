namespace API.Features.Billing.Ledgers {

    public class EmailLedgerVM {

        public string Displayname { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string[] Filenames { get; set; }

    }

}