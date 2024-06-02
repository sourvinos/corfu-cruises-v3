using API.Features.Billing.Invoices;
using API.Features.Reservations.Parameters;
using API.Infrastructure.Helpers;
using AutoMapper;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using RazorLight;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace API.Features.RetailSales {

    public class RetailSaleEmailSender : IRetailSaleEmailSender {

        #region variables

        private readonly EmailInvoicingSettings emailSettings;
        private readonly IMapper mapper;
        private readonly IReservationParametersRepository parametersRepo;

        #endregion

        public RetailSaleEmailSender(IOptions<EmailInvoicingSettings> emailSettings, IMapper mapper, IReservationParametersRepository parametersRepo) {
            this.emailSettings = emailSettings.Value;
            this.mapper = mapper;
            this.parametersRepo = parametersRepo;
        }

        #region public methods

        public async Task SendRetailSaleToEmail(EmailRetailSaleVM model) {
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.Username, emailSettings.Password);
            await smtp.SendAsync(await BuildMessage(model));
            smtp.Disconnect(true);
        }

        #endregion

        #region private methods

        private async Task<MimeMessage> BuildMessage(EmailRetailSaleVM model) {
            var message = new MimeMessage { Sender = MailboxAddress.Parse(emailSettings.Username) };
            message.From.Add(new MailboxAddress(emailSettings.From, emailSettings.Username));
            message.To.AddRange(BuildReceivers(model.Email));
            message.Subject = "📧 Ηλεκτρονική αποστολή παραστατικών";
            var builder = new BodyBuilder { HtmlBody = await BuildEmailTemplate(model.Email) };
            builder.Attachments.Add(Path.Combine("Reports" + Path.DirectorySeparatorChar + "Invoices" + Path.DirectorySeparatorChar + model.Filename + ".pdf"));
            message.Body = builder.ToMessageBody();
            return message;
        }

        private static InternetAddressList BuildReceivers(string email) {
            InternetAddressList x = new();
            var emails = email.Split(",");
            foreach (string address in emails) {
                x.Add(MailboxAddress.Parse(EmailHelpers.BeValidEmailAddress(address.Trim()) ? address.Trim() : "postmaster@appcorfucruises.com"));
            }
            return x;
        }

        private async Task<string> BuildEmailTemplate(string email) {
            RazorLightEngine engine = new RazorLightEngineBuilder()
                .UseEmbeddedResourcesProject(Assembly.GetEntryAssembly())
                .Build();
            return await engine.CompileRenderStringAsync(
                "key",
                LoadEmailRreceiptTemplateFromFile(),
                new EmailInvoiceTemplateVM {
                    Email = email,
                    CompanyPhones = this.parametersRepo.GetAsync().Result.Phones,
                });
        }

        private static string LoadEmailRreceiptTemplateFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\EmailRetailSale.cshtml";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

        #endregion

    }

}