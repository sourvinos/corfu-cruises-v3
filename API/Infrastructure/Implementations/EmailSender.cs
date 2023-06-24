using System.IO;
using System.Threading.Tasks;
using API.Infrastructure.Helpers;
using API.Infrastructure.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace API.Infrastructure.Implementations {

    public class EmailSender : IEmailSender {

        private readonly EmailSettings emailSettings;

        public EmailSender(IOptions<EmailSettings> emailSettings) {
            this.emailSettings = emailSettings.Value;
        }

        public async Task SendForgotPasswordEmail(string username, string displayname, string email, string returnUrl, string language) {
            string FilePath = Directory.GetCurrentDirectory() + "\\Infrastructure\\Account\\Templates\\ResetPassword.cshtml";
            StreamReader str = new(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText
                .Replace("[logo]", SetLogoAsBackground())
                .Replace("[displayname]", displayname)
                .Replace("[username]", username)
                .Replace("[email]", email)
                .Replace("[phones]", emailSettings.Phones)
                .Replace("[returnUrl]", returnUrl);
            var senderEmail = new MimeMessage {
                Sender = MailboxAddress.Parse(emailSettings.UserName)
            };
            senderEmail.From.Add(new MailboxAddress(emailSettings.From, emailSettings.UserName));
            senderEmail.To.Add(MailboxAddress.Parse(email));
            senderEmail.Subject = "Reset password request";
            var builder = new BodyBuilder {
                HtmlBody = MailText
            };
            senderEmail.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.UserName, emailSettings.Password);
            await smtp.SendAsync(senderEmail);
            smtp.Disconnect(true);
        }

         private static string SetLogoAsBackground() {
            return "background: url(data:image/png;base64," + LogoService.GetBase64Logo() + ")";
        }


    }

}