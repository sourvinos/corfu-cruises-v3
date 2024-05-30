using System;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.RetailSales {

    public interface IRetailSaleUpdateRepository : IRepository<RetailSale> {

        RetailSale Update(Guid reservationId, RetailSale invoice);
        Task<int> IncreaseInvoiceNoAsync(RetailSaleWriteDto invoice);
        void UpdateIsEmailSent(RetailSale invoice, string invoiceId);

    }

}