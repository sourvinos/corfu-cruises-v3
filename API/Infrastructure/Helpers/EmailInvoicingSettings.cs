﻿namespace API.Infrastructure.Helpers {

    public class EmailInvoicingSettings {

        public string From { get; set; }
        public string SmtpClient { get; set; }
        public int Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

    }

}