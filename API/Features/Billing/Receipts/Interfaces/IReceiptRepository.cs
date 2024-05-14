using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Receipts {

    public interface IReceiptRepository : IRepository<Receipt> {

        Task<IEnumerable<ReceiptListVM>> GetAsync();
        Task<IEnumerable<ReceiptListVM>> GetForPeriodAsync(ReceiptListCriteriaVM criteria);
        Task<Receipt> GetByIdAsync(string transactionId, bool includeTables);
        Task<Receipt> GetByIdForPdfAsync(string invoiceId);
        Task<Receipt> GetByIdForPatchEmailSent(string invoiceId);
        Task<int> IncreaseInvoiceNoAsync(ReceiptWriteDto invoice);
        void UpdateIsEmailSent(Receipt invoice, string invoiceId);

    }

}