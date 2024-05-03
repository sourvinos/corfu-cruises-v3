using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceReadRepository : IRepository<Invoice> {

        Task<IEnumerable<InvoiceListVM>> GetAsync();
        Task<IEnumerable<InvoiceListVM>> GetForPeriodAsync(InvoiceListCriteriaVM criteria);
        Task<Invoice> GetByIdAsync(string invoiceId, bool includeTables);
        Task<Invoice> GetByIdForPdfAsync(string invoiceId);
        Task<Invoice> GetByIdForPatchEmailSent(string invoiceId);
        Task<Invoice> GetByIdForXmlAsync(string invoiceId);
        Task<InvoiceAade> GetInvoiceAadeByIdAsync(string invoiceId);

    }

}