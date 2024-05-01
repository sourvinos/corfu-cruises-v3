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

namespace API.Features.Billing.Receipts {

    public class ReceiptEmailSender : IReceiptEmailSender {

        #region variables

        private readonly EmailSettings emailSettings;
        private readonly ICustomerRepository customerRepo;
        private readonly IMapper mapper;
        private readonly IReservationParametersRepository parametersRepo;

        #endregion

        public ReceiptEmailSender(ICustomerRepository customerRepo, IOptions<EmailSettings> emailSettings, IMapper mapper, IReservationParametersRepository parametersRepo) {
            this.customerRepo = customerRepo;
            this.emailSettings = emailSettings.Value;
            this.mapper = mapper;
            this.parametersRepo = parametersRepo;
        }

        #region public methods

        public async Task SendReceiptToEmail(EmailReceiptVM model) {
            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.SmtpClient, emailSettings.Port);
            smtp.Authenticate(emailSettings.Username, emailSettings.Password);
            await smtp.SendAsync(await BuildReceiptMessage(model));
            smtp.Disconnect(true);
        }

        #endregion

        #region private methods

        private async Task<MimeMessage> BuildReceiptMessage(EmailReceiptVM model) {
            var customer = GetCustomerAsync(model.CustomerId).Result;
            var message = new MimeMessage { Sender = MailboxAddress.Parse(emailSettings.Username) };
            message.From.Add(new MailboxAddress(emailSettings.From, emailSettings.Username));
            message.To.Add(MailboxAddress.Parse(customer.Email));
            message.Subject = "📧 Ηλεκτρονική αποστολή παραστατικών";
            var builder = new BodyBuilder { HtmlBody = await BuildEmailReceiptTemplate(customer.Description, customer.Email) };
            builder.Attachments.Add(Path.Combine("Reports" + Path.DirectorySeparatorChar + "Invoices" + Path.DirectorySeparatorChar + model.Filename));
            message.Body = builder.ToMessageBody();
            return message;
        }

        private async Task<string> BuildEmailReceiptTemplate(string displayname, string email) {
            RazorLightEngine engine = new RazorLightEngineBuilder()
                .UseEmbeddedResourcesProject(Assembly.GetEntryAssembly())
                .Build();
            return await engine.CompileRenderStringAsync(
                "key",
                LoadEmailRreceiptTemplateFromFile(),
                new EmailReceiptTemplateVM {
                    Displayname = displayname,
                    Email = email,
                    CompanyPhones = this.parametersRepo.GetAsync().Result.Phones,
                });
        }

        private static string LoadEmailRreceiptTemplateFromFile() {
            string FilePath = Directory.GetCurrentDirectory() + "\\Templates\\EmailReceipt.cshtml";
            StreamReader str = new(FilePath);
            string template = str.ReadToEnd();
            str.Close();
            return template;
        }

        private async Task<EmailReceiptCustomerVM> GetCustomerAsync(int id) {
            var x = await customerRepo.GetByIdAsync(id, false);
            if (x != null) {
                return mapper.Map<Customer, EmailReceiptCustomerVM>(x);
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        #endregion

    }

}