using API.Features.Reservations.Customers;
using API.Features.Reservations.Parameters;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using RazorLight;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public class InvoiceEmailSender : IInvoiceEmailSender {

        #region variables

        private readonly EmailSettings emailSettings;
        private readonly ICustomerRepository customerRepo;
        private readonly IMapper mapper;
        private readonly IReservationParametersRepository parametersRepo;

        #endregion

        public InvoiceEmailSender(ICustomerRepository customerRepo, IOptions<EmailSettings> emailSettings, IMapper mapper, IReservationParametersRepository parametersRepo) {
            this.customerRepo = customerRepo;
            this.emailSettings = emailSettings.Value;
            this.mapper = mapper;
            this.parametersRepo = parametersRepo;
        }

        #region public methods

        public async Task SendInvoiceToEmail(EmailInvoiceVM model) {
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.Username, emailSettings.Password);
            await smtp.SendAsync(await BuildInvoiceMessage(model));
            smtp.Disconnect(true);
        }

        #endregion

        #region private methods

        private async Task<MimeMessage> BuildInvoiceMessage(EmailInvoiceVM model) {
            var customer = GetCustomerAsync(model.CustomerId).Result;
            var message = new MimeMessage { Sender = MailboxAddress.Parse(emailSettings.Username) };
            message.From.Add(new MailboxAddress(emailSettings.From, emailSettings.Username));
            message.To.Add(MailboxAddress.Parse(customer.Email));
            message.Subject = "📧 Ηλεκτρονική αποστολή παραστατικών";
            var builder = new BodyBuilder { HtmlBody = await BuildEmailInvoiceTemplate(customer.Description, customer.Email) };
            builder.Attachments.Add(Path.Combine("Reports" + Path.DirectorySeparatorChar + "Invoices" + Path.DirectorySeparatorChar + model.Filename));
            message.Body = builder.ToMessageBody();
            return message;
        }

        private async Task<string> BuildEmailInvoiceTemplate(string displayname, string email) {
            RazorLightEngine engine = new RazorLightEngineBuilder()
                .UseEmbeddedResourcesProject(Assembly.GetEntryAssembly())
                .Build();
            return await engine.CompileRenderStringAsync(
                "key",
                LoadEmailInvoiceTemplateFromFile(),
                new EmailInvoiceTemplateVM {
                    Displayname = displayname,
                    Email = email,
                    CompanyPhones = this.parametersRepo.GetAsync().Result.Phones,
                });
        }

        private static string LoadEmailInvoiceTemplateFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\EmailInvoice.cshtml";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

        private async Task<EmailInvoiceCustomerVM> GetCustomerAsync(int id) {
            var x = await customerRepo.GetByIdAsync(id, false);
            if (x != null) {
                return mapper.Map<Customer, EmailInvoiceCustomerVM>(x);
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        #endregion

    }

}