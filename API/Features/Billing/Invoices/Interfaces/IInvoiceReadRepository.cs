using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceReadRepository : IRepository<Invoice> {

        Task<IEnumerable<InvoiceListVM>> GetAsync();
        Task<IEnumerable<InvoiceListVM>> GetForPeriodAsync(string from, string to);
        Task<Invoice> GetByIdAsync(string invoiceId, bool includeTables);
        Task<Invoice> GetByIdForXmlAsync(string invoiceId);
        Task<InvoiceAade> GetInvoiceAadeByIdAsync(string invoiceId);
        Task<Invoice> GetForViewerByIdAsync(string invoiceId);

    }

}