using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.DocumentTypes {

    public interface IDocumentTypeRepository : IRepository<DocumentType> {

        Task<IEnumerable<DocumentTypeListVM>> GetAsync();
        Task<IEnumerable<DocumentTypeAutoCompleteVM>> GetAutoCompleteAsync();
        Task<DocumentType> GetByIdAsync(int id);
 
    }

}