using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeValidation : Repository<DocumentType>, IDocumentTypeValidation {

        public DocumentTypeValidation(AppDbContext appDbContext, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) { }

        public async Task<int> IsValidAsync(DocumentType z, DocumentTypeWriteDto documentType) {
            return true switch {
                var x when x == !await IsValidCompany(documentType) => 449,
                var x when x == IsAlreadyUpdated(z, documentType) => 415,
                _ => 200,
            };
        }

        private async Task<bool> IsValidCompany(DocumentTypeWriteDto documentType) {
            if (documentType.Id == 0) {
                return await context.ShipOwners
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == documentType.CompanyId && x.IsActive) != null;
            }
            return await context.ShipOwners
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == documentType.CompanyId) != null;
        }

        private static bool IsAlreadyUpdated(DocumentType z, DocumentTypeWriteDto DocumentType) {
            return z != null && z.PutAt != DocumentType.PutAt;
        }

    }

}