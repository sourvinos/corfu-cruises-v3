using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Receipts {

    public interface IReceiptRepository : IRepository<Receipt> {

        Task<IEnumerable<ReceiptListVM>> GetAsync();
        Task<IEnumerable<ReceiptListVM>> GetForPeriodAsync(ReceiptListCriteriaVM criteria);
        Task<Receipt> GetByIdAsync(string transactionId, bool includeTables);
        Task<Receipt> GetForViewerByIdAsync(string invoiceId);
        Task<Receipt> GetByIdForPdfAsync(string invoiceId);
        void UpdateIsEmailSent(Receipt invoice, string invoiceId);
    
    }

}