using API.Infrastructure.Account;
using AutoMapper;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public class InvoiceEmailScheduleSender : IInvoiceEmailScheduleSender, IHostedService, IDisposable {

        private Timer timer;
        private readonly IInvoiceReadRepository invoiceReadRepo;
        // private readonly InvoiceUpdateRepository updateRepo;
        private readonly IInvoiceEmailSender invoiceEmailSender;
        private readonly IInvoicePdfRepository invoicePdfRepo;
        private readonly IMapper mapper;

        public InvoiceEmailScheduleSender(IInvoiceEmailSender invoiceEmailSender, IInvoicePdfRepository invoicePdfRepo, IInvoiceReadRepository invoiceReadRepo, IMapper mapper) {
            this.invoicePdfRepo = invoicePdfRepo;
            this.invoiceReadRepo = invoiceReadRepo;
            this.invoiceEmailSender = invoiceEmailSender;
            this.mapper = mapper;
        }

        public Task StartAsync(CancellationToken cancellationToken) {
            timer = new Timer(SendInvoicesToEmailScheduleAsync, null, TimeSpan.Zero, TimeSpan.FromSeconds(60));
            return Task.CompletedTask;
        }

        public void SendInvoicesToEmailScheduleAsync(object state) {
            var x = invoiceReadRepo.GetFirstWithEmailPending();
            if (x != null) {
                var z = invoicePdfRepo.BuildPdf(x);
                if (z != "") {
                    string[] dessert = new string[] { z };
                    var i = new EmailInvoicesVM {
                        CustomerId = 2,
                        Filenames = dessert
                    };
                    var response = invoiceEmailSender.SendInvoicesToEmail(i);
                    Console.WriteLine(response);
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken) {
            timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose() {
            timer?.Dispose();
        }

    }

}