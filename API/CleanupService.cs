using System;
using System.Threading;
using System.Threading.Tasks;
using API.Features.Billing.Invoices;
using API.Infrastructure.Classes;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API {

    public class CleanupService : BackgroundService {

        private readonly IInvoiceEmailSender invoiceEmailSender;
        private readonly IInvoiceReadRepository invoiceReadRepo;
        private readonly IInvoicePdfRepository invoicePdfRepo;
        private readonly IServiceProvider serviceProvider;
        // private readonly InvoiceUpdateRepository invoiceUpdateRepo;

        public CleanupService(IInvoiceEmailSender invoiceEmailSender, IInvoicePdfRepository invoicePdfRepo, IInvoiceReadRepository invoiceReadRepo, IServiceProvider serviceProvider) {
            this.invoiceEmailSender = invoiceEmailSender;
            this.invoicePdfRepo = invoicePdfRepo;
            this.invoiceReadRepo = invoiceReadRepo;
            this.serviceProvider = serviceProvider;
            // this.invoiceUpdateRepo = invoiceUpdateRepo;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken) {
            while (!stoppingToken.IsCancellationRequested) {
                await Task.Delay(TimeSpan.FromSeconds(60), stoppingToken);
                using var scope = serviceProvider.CreateScope();
                var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var x = invoiceReadRepo.GetFirstWithEmailPending();
                if (x != null) {
                    var z = invoicePdfRepo.BuildPdf(x);
                    if (z != "") {
                        string[] dessert = new string[] { z };
                        var i = new EmailInvoicesVM {
                            CustomerId = 2,
                            Filenames = dessert
                        };
                        await invoiceEmailSender.SendInvoicesToEmail(i);
                        var w = await invoiceReadRepo.GetByIdForPatchEmailSent(x.InvoiceId.ToString());
                        w.IsEmailPending = false;
                        w.IsEmailSent = true;
                        ctx.Invoices.Attach(w);
                        ctx.Entry(w).Property(x => x.IsEmailPending).IsModified = true;
                        ctx.Entry(w).Property(x => x.IsEmailSent).IsModified = true;
                        ctx.SaveChanges();

                        // invoiceUpdateRepo.UpdateIsEmailSent(w, x.InvoiceId.ToString());
                    }
                }

                // var x = await context.Transactions.Where(x => x.IsEmailPending).FirstOrDefaultAsync(stoppingToken);
                // if (x != null) {
                //     using var transaction = context.Database.BeginTransaction();
                //     x.IsEmailPending = false;
                //     x.IsEmailSent = true;
                //     context.Transactions.Attach(x);
                //     context.Entry(x).Property(x => x.IsEmailSent).IsModified = true;
                //     context.SaveChanges();
                //     transaction.Dispose();
                // }
            }
        }

    }

}