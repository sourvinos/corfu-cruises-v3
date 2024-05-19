using System;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Retail {

    public interface IRetailUpdateRepository : IRepository<Retail> {

        Retail Update(Guid id, Retail retail);
        Task<int> IncreaseRetailNoAsync(RetailCreateDto retail);
        RetailAade UpdateRetailAade(RetailAade retailAade);

    }

}