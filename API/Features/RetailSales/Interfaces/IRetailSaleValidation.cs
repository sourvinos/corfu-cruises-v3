using System.Threading.Tasks;

namespace API.Features.RetailSales {

    public interface IRetailSaleValidation {

        Task<int> IsValidAsync(RetailSale x, RetailSaleWriteDto invoice);

    }

}