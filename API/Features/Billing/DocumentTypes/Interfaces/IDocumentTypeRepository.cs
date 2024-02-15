using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.DocumentTypes {

    public interface IDocumentTypeRepository : IRepository<DocumentType> {

        Task<IEnumerable<DocumentTypeListVM>> GetAsync();
        Task<IEnumerable<DocumentTypeBrowserStorageVM>> GetForBrowserStorageAsync();
        Task<DocumentTypeBrowserStorageVM> GetByIdForBrowserStorageAsync(int id);
        Task<DocumentType> GetByIdAsync(int id);
 
    }

}