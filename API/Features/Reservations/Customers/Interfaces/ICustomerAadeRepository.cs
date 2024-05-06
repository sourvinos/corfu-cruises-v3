using System.IO;
using System.Threading.Tasks;
using API.Infrastructure.Responses;

namespace API.Features.Reservations.Customers {

    public interface ICustomerAadeRepository {

        StreamWriter GetAsync();

    }

}