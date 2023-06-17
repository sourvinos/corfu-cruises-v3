using System.IO;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace API.Infrastructure.Account {

    public class EmailSender : IEmailSender {

        private readonly EmailSettings settings;

        public EmailSender(IOptions<EmailSettings> settings) {
            this.settings = settings.Value;
        }

        public async Task SendResetPasswordEmail(string displayName, string email, string returnUrl, string language, string company, string username, string phones) {
            string FilePath = Directory.GetCurrentDirectory() + "\\Infrastructure\\Templates\\ResetPassword.html";
            StreamReader str = new(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText
                .Replace("[company]", company)
                .Replace("[displayname]", displayName)
                .Replace("[username]", username)
                .Replace("[email]", email)
                .Replace("[phones]", phones)
                .Replace("[returnUrl]", returnUrl)
                ;
            var senderEmail = new MimeMessage {
                Sender = MailboxAddress.Parse("no-reply-check-in@corfucruises.com")
            };
            senderEmail.From.Add(new MailboxAddress("Corfu Cruises / Check-In", "no-reply-check-in@corfucruises.com"));
            senderEmail.To.Add(MailboxAddress.Parse(email));
            senderEmail.Subject = "Reset password request";
            var builder = new BodyBuilder {
                HtmlBody = MailText
            };
            senderEmail.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect("mail.corfucruises.com", 465);
            smtp.Authenticate("no-reply-check-in@corfucruises.com", "kycpen-cIxkup-9kuwva");
            await smtp.SendAsync(senderEmail);
            smtp.Disconnect(true);
        }

    }

}