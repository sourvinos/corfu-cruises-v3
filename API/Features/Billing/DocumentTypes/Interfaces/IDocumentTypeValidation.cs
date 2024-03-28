using System.Threading.Tasks;
using API.Infrastructure.Interfaces;

namespace API.Features.Billing.DocumentTypes {

    public interface IDocumentTypeValidation : IRepository<DocumentType> {

        Task<int> IsValidAsync(DocumentType x, DocumentTypeWriteDto DocumentType);

    }

}