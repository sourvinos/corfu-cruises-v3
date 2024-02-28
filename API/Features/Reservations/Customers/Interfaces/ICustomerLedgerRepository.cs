using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Customers {

    public interface ICustomerLedgerRepository : IRepository<Customer> {

        Task<IEnumerable<CustomerLedgerDetailLineVM>> GetLedgerAsync(int id);
        IEnumerable<CustomerLedgerDetailLineVM> BuildBalance(IEnumerable<CustomerLedgerDetailLineVM> records);
        CustomerLedgerVM BuildLedger(IEnumerable<CustomerLedgerDetailLineVM> records, string fromDate);

    }

}
