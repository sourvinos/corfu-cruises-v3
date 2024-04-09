using System;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceUpdateRepository : IRepository<Invoice> {

        Invoice Update(Guid id, Invoice invoice);
        InvoiceAade UpdateInvoiceAade(InvoiceAade invoiceAade);
        void UpdateIsEmailSent(Invoice invoice, string invoiceId);
        Task<int> AttachShipOwnerIdToInvoiceAsync(InvoiceCreateDto invoice);

    }

}