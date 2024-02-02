using System.Threading.Tasks;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceValidation {

        bool IsUserOwner(int customerId);
        Task<int> IsValidAsync(Invoice x, InvoiceWriteDto reservation);

    }

}