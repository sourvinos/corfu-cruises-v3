using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceValidation {

        Task<int> IsValidAsync(Invoice x, InvoiceWriteDto invoice);

    }

}