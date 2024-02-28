using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.IdentityDocuments {

    public interface IIdentityDocumentRepository : IRepository<IdentityDocument> {

        Task<IEnumerable<IdentityDocumentListVM>> GetAsync();
        Task<IEnumerable<IdentityDocumentAutoCompleteVM>> GetForAutoCompleteAsync();
        Task<IdentityDocument> GetByIdAsync(int id);

    }

}