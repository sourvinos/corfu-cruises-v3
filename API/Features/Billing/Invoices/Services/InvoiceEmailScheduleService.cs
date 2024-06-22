using System;
using System.Threading;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API.Features.Billing.Invoices {

    public class InvoiceEmailScheduleService : BackgroundService {

        private readonly IInvoiceEmailSender invoiceEmailSender;
        private readonly IInvoicePdfRepository invoicePdfRepo;
        private readonly IInvoiceReadRepository invoiceReadRepo;
        private readonly IServiceProvider serviceProvider;

        public InvoiceEmailScheduleService(IInvoiceEmailSender invoiceEmailSender, IInvoicePdfRepository invoicePdfRepo, IInvoiceReadRepository invoiceReadRepo, IServiceProvider serviceProvider) {
            this.invoiceEmailSender = invoiceEmailSender;
            this.invoicePdfRepo = invoicePdfRepo;
            this.invoiceReadRepo = invoiceReadRepo;
            this.serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken) {
            while (!stoppingToken.IsCancellationRequested) {
                await Task.Delay(TimeSpan.FromSeconds(120), stoppingToken);
                var x = invoiceReadRepo.GetFirstWithEmailPending();
                if (x != null) {
                    await invoiceEmailSender.SendInvoicesToEmail(BuildVM(x));
                    await PatchInvoiceEmailFields(x);
                }
            }
        }

        private EmailInvoicesVM BuildVM(InvoicePdfVM x) {
            string[] filenames = { invoicePdfRepo.BuildPdf(x) };
            return new EmailInvoicesVM {
                CustomerId = x.Customer.Id,
                Filenames = filenames
            };
        }

        private async Task PatchInvoiceEmailFields(InvoicePdfVM invoiceVM) {
            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var invoice = await invoiceReadRepo.GetByIdForPatchEmailSent(invoiceVM.InvoiceId.ToString());
            invoice.IsEmailPending = false;
            invoice.IsEmailSent = true;
            dbContext.Invoices.Attach(invoice);
            dbContext.Entry(invoice).Property(x => x.IsEmailPending).IsModified = true;
            dbContext.Entry(invoice).Property(x => x.IsEmailSent).IsModified = true;
            dbContext.SaveChanges();
        }

    }

}