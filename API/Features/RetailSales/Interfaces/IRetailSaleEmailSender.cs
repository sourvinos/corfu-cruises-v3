using System.Threading.Tasks;

namespace API.Features.RetailSales {

    public interface IRetailSaleEmailSender {

        Task SendRetailSaleToEmail(EmailRetailSaleVM model);

    }

}