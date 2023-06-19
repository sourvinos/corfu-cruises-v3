using System.IO;
using System.Threading.Tasks;
using API.Infrastructure.Account;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace API.Features.Reservations {

    public class ReservationSendToEmail : IReservationSendToEmail {

        private readonly EmailSettings emailSettings;

        public ReservationSendToEmail(IOptions<EmailSettings> emailSettings) {
            this.emailSettings = emailSettings.Value;
        }

        public async Task SendReservationToEmail(Reservation reservation) {
            string FilePath = Directory.GetCurrentDirectory() + "\\Features\\Reservations\\Templates\\Reservation.html";
            StreamReader str = new(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText
                .Replace("[company]", emailSettings.Company)
                .Replace("[refNo]", reservation.RefNo)
                // .Replace("[username]", username)
                // .Replace("[email]", email)
                .Replace("[phones]", emailSettings.Phones);
            // .Replace("[returnUrl]", returnUrl);
            var senderEmail = new MimeMessage {
                Sender = MailboxAddress.Parse(emailSettings.UserName)
            };
            senderEmail.From.Add(new MailboxAddress(emailSettings.From, emailSettings.UserName));
            senderEmail.To.Add(MailboxAddress.Parse(reservation.Email));
            senderEmail.Subject = "Your reservation is ready";
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

    }

}
