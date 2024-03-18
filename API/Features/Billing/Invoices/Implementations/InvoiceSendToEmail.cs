using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using API.Features.Reservations.Parameters;
using API.Infrastructure.Helpers;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using RazorLight;

namespace API.Features.Billing.Invoices {

    public class InvoiceSendToEmail : IInvoiceSendToEmail {

        private readonly EmailSettings emailSettings;
        private readonly IReservationParametersRepository parametersRepo;

        public InvoiceSendToEmail(IOptions<EmailSettings> emailSettings, IReservationParametersRepository parametersRepo) {
            this.emailSettings = emailSettings.Value;
            this.parametersRepo = parametersRepo;
        }

        public async Task SendInvoiceLinkToEmail(InvoiceLinkVM invoiceLink, string returnUrl) {
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.Username, emailSettings.Password);
            await smtp.SendAsync(await BuildMessage(invoiceLink, returnUrl));
            smtp.Disconnect(true);
        }

        private async Task<MimeMessage> BuildMessage(InvoiceLinkVM invoiceLink, string returnUrl) {
            var message = new MimeMessage { Sender = MailboxAddress.Parse(emailSettings.Username) };
            message.From.Add(new MailboxAddress(emailSettings.From, emailSettings.Username));
            message.To.Add(MailboxAddress.Parse(invoiceLink.Email));
            message.Subject = "Το τιμολόγιο σας είναι έτοιμο!";
            message.Body = new BodyBuilder { HtmlBody = await BuildTemplate(invoiceLink, returnUrl) }.ToMessageBody();
            return message;
        }

        private static async Task<string> BuildTemplate(InvoiceLinkVM invoiceLink, string returnUrl) {
            RazorLightEngine engine = new RazorLightEngineBuilder()
                .UseEmbeddedResourcesProject(Assembly.GetEntryAssembly())
                .Build();
            return await engine.CompileRenderStringAsync(
                "key",
                LoadTemplateFromFile(), $"{returnUrl}#/invoicesViewer/{invoiceLink.InvoiceId}");
        }

        private static string LoadTemplateFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\InvoiceLink.cshtml";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

    }

}
