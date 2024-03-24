using System;
using System.Collections.Generic;
using System.Linq;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;

namespace API.Features.Billing.Invoices {

    public class InvoiceUpdateRepository : Repository<Invoice>, IInvoiceUpdateRepository {

        private readonly TestingEnvironment testingEnvironment;

        public InvoiceUpdateRepository(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(context, httpContext, testingEnvironment, userManager) {
            this.testingEnvironment = testingEnvironment.Value;
        }

        public Invoice Update(Guid invoiceId, Invoice invoice) {
            using var transaction = context.Database.BeginTransaction();
            UpdateInvoice(invoice);
            DeletePorts(invoiceId, invoice.InvoicesPorts);
            context.SaveChanges();
            DisposeOrCommit(transaction);
            return invoice;
        }

        public InvoiceAade UpdateInvoiceAade(InvoiceAade invoiceAade) {
            using var transaction = context.Database.BeginTransaction();
            context.InvoicesAade.Update(invoiceAade);
            context.SaveChanges();
            DisposeOrCommit(transaction);
            return invoiceAade;
        }

        private void DisposeOrCommit(IDbContextTransaction transaction) {
            if (testingEnvironment.IsTesting) {
                transaction.Dispose();
            } else {
                transaction.Commit();
            }
        }

        private void UpdateInvoice(Invoice invoice) {
            context.Invoices.Update(invoice);
        }

        private void DeletePorts(Guid invoiceId, List<InvoicePort> ports) {
            var existingPorts = context.InvoicesPorts
                .AsNoTracking()
                .Where(x => x.InvoiceId == invoiceId)
                .ToList();
            var portsToUpdate = ports
                .Where(x => x.Id != 0)
                .ToList();
            var portsToDelete = existingPorts
                .Except(portsToUpdate, new PortComparerById())
                .ToList();
            context.InvoicesPorts.RemoveRange(portsToDelete);
        }

        private class PortComparerById : IEqualityComparer<InvoicePort> {
            public bool Equals(InvoicePort x, InvoicePort y) {
                return x.Id == y.Id;
            }
            public int GetHashCode(InvoicePort x) {
                return x.Id.GetHashCode();
            }
        }

    }

}