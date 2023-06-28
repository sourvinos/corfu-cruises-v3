using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using API.Infrastructure.Helpers;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using RazorLight;

namespace API.Infrastructure.Account {

    public class EmailSender : IEmailSender {

        private readonly CompanySettings companySettings;
        private readonly EmailSettings emailSettings;

        public EmailSender(IOptions<CompanySettings> companySettings, IOptions<EmailSettings> emailSettings) {
            this.companySettings = companySettings.Value;
            this.emailSettings = emailSettings.Value;
        }

        public async Task SendForgotPasswordEmail(string username, string displayname, string email, string returnUrl, string subject) {
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.UserName, emailSettings.Password);
            await smtp.SendAsync(await BuildMessage(username, displayname, email, subject, returnUrl));
            smtp.Disconnect(true);
        }

        private async Task<MimeMessage> BuildMessage(string username, string displayname, string email, string subject, string returnUrl) {
            var message = new MimeMessage { Sender = MailboxAddress.Parse(emailSettings.UserName) };
            message.From.Add(new MailboxAddress(emailSettings.From, emailSettings.UserName));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = subject;
            message.Body = new BodyBuilder { HtmlBody = await BuildTemplate(username, displayname, email, returnUrl) }.ToMessageBody();
            return message;
        }

        private async Task<string> BuildTemplate(string username, string displayname, string email, string returnUrl) {
            RazorLightEngine engine = new RazorLightEngineBuilder()
                .UseEmbeddedResourcesProject(Assembly.GetEntryAssembly())
                .Build();
            return await engine.CompileRenderStringAsync(
                "key",
                LoadTemplateFromFile(),
                new ForgotPasswordResponseVM {
                    Username = username,
                    Displayname = displayname,
                    Email = email,
                    ReturnUrl = returnUrl,
                    Phones = companySettings.Phones,
                    LogoTextBase64 = SetLogoTextAsBackground()
                });
        }

        private static string LoadTemplateFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Infrastructure\\Account\\Templates\\ResetPassword.cshtml";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

        private static string SetLogoTextAsBackground() {
            return "width: 116px; height: 23px; background: url(data:image/png;base64," + LogoService.GetBase64LogoText() + ")";
        }

    }

}