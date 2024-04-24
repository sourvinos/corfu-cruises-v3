using API.Features.Billing.Ledgers;
using API.Features.Reservations.Parameters;
using API.Infrastructure.Helpers;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using RazorLight;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace API.Infrastructure.Account {

    public class EmailSender : IEmailSender {

        private readonly EmailSettings emailSettings;
        private readonly IReservationParametersRepository parametersRepo;

        public EmailSender(IOptions<EmailSettings> emailSettings, IReservationParametersRepository parametersRepo) {
            this.emailSettings = emailSettings.Value;
            this.parametersRepo = parametersRepo;
        }

        public async Task SendForgotPasswordEmail(string username, string displayname, string email, string returnUrl, string subject) {
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.Username, emailSettings.Password);
            await smtp.SendAsync(await BuildForgotPasswordMessage(username, displayname, email, subject, returnUrl));
            smtp.Disconnect(true);
        }

        public async Task SendLedgerToEmail(EmailLedgerVM model) {
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.Username, emailSettings.Password);
            await smtp.SendAsync(await BuildLedgerMessage(model));
            smtp.Disconnect(true);
        }

        private async Task<MimeMessage> BuildForgotPasswordMessage(string username, string displayname, string email, string subject, string returnUrl) {
            var message = new MimeMessage { Sender = MailboxAddress.Parse(emailSettings.Username) };
            message.From.Add(new MailboxAddress(emailSettings.From, emailSettings.Username));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = subject;
            message.Body = new BodyBuilder { HtmlBody = await BuildForgotPasswordTemplate(emailSettings.From, username, displayname, email, returnUrl) }.ToMessageBody();
            return message;
        }

        private async Task<MimeMessage> BuildLedgerMessage(EmailLedgerVM model) {
            var message = new MimeMessage { Sender = MailboxAddress.Parse(emailSettings.Username) };
            message.From.Add(new MailboxAddress(emailSettings.From, emailSettings.Username));
            message.To.Add(MailboxAddress.Parse(model.Email));
            message.Subject = model.Subject;
            var builder = new BodyBuilder { HtmlBody = await BuildEmailLedgerTemplate(model.Displayname, model.Email) };
            foreach (var filename in model.Filenames) {
                builder.Attachments.Add(Path.Combine("Reports" + Path.DirectorySeparatorChar + "Ledgers" + Path.DirectorySeparatorChar + filename));
            }
            message.Body = builder.ToMessageBody();
            return message;
        }

        private async Task<string> BuildForgotPasswordTemplate(string logo, string username, string displayname, string email, string returnUrl) {
            RazorLightEngine engine = new RazorLightEngineBuilder()
                .UseEmbeddedResourcesProject(Assembly.GetEntryAssembly())
                .Build();
            return await engine.CompileRenderStringAsync(
                "key",
                LoadForgotPasswordTemplateFromFile(),
                new ForgotPasswordResponseVM {
                    Logo = logo,
                    Username = username,
                    Displayname = displayname,
                    Email = email,
                    ReturnUrl = returnUrl,
                    CompanyPhones = this.parametersRepo.GetAsync().Result.Phones,
                });
        }

        private async Task<string> BuildEmailLedgerTemplate(string displayname, string email) {
            RazorLightEngine engine = new RazorLightEngineBuilder()
                .UseEmbeddedResourcesProject(Assembly.GetEntryAssembly())
                .Build();
            return await engine.CompileRenderStringAsync(
                "key",
                LoadEmailLedgerTemplateFromFile(),
                new EmailLedgerTemplateVM {
                    Displayname = displayname,
                    Email = email,
                    CompanyPhones = this.parametersRepo.GetAsync().Result.Phones,
                });
        }


        private static string LoadForgotPasswordTemplateFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\ResetPassword.cshtml";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

        private static string LoadEmailLedgerTemplateFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\EmailLedger.cshtml";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

    }

}