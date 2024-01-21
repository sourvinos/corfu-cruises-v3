using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceRepository : IRepository<Invoice> {

        Task<IEnumerable<InvoiceListVM>> GetForPeriodAsync(string from, string to);

    }

}