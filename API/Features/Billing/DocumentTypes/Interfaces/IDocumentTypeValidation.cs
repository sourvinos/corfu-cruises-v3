using API.Infrastructure.Interfaces;

namespace API.Features.Billing.DocumentTypes {

    public interface IDocumentTypeValidation : IRepository<DocumentType> {

        int IsValid(DocumentType x, DocumentTypeWriteDto DocumentType);

    }

}