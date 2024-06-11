using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.RetailSales {

    public interface IRetailSaleReadRepository : IRepository<RetailSale> {

        Task<IEnumerable<RetailSaleListVM>> GetForPeriodAsync(RetailSaleListCriteriaVM criteria);
        Task<RetailSale> GetByIdForXmlAsync(string reservationId);
        Task<RetailSale> GetByIdForPdfAsync(int id);
        Task<RetailSale> GetByIdForPatchEmailSent(int id);
        Task<RetailSale> GetByIdForPatchAade(string reservationId);
        void UpdateIsEmailSent(RetailSale invoice);

    }

}