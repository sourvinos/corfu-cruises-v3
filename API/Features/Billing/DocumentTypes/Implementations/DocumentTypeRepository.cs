using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeRepository : Repository<DocumentType>, IDocumentTypeRepository {

        private readonly IMapper mapper;
        private readonly TestingEnvironment testingEnvironment;

        public DocumentTypeRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> testingEnvironment, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, testingEnvironment, userManager) {
            this.mapper = mapper;
            this.testingEnvironment = testingEnvironment.Value;
        }

        public async Task<IEnumerable<DocumentTypeListVM>> GetAsync() {
            var DocumentTypes = await context.DocumentTypes
                .AsNoTracking()
                .Include(x => x.Ship)
                .OrderBy(x => x.Ship.Description).ThenBy(x => x.DiscriminatorId).ThenBy(x => x.Description).ThenBy(x => x.Batch)
                .ToListAsync();
            return mapper.Map<IEnumerable<DocumentType>, IEnumerable<DocumentTypeListVM>>(DocumentTypes);
        }

        public async Task<IEnumerable<DocumentTypeBrowserVM>> GetForBrowserAsync(int discriminatorId) {
            var DocumentTypes = await context.DocumentTypes
                .AsNoTracking()
                .Include(x => x.Ship)
                .Where(x => x.DiscriminatorId == discriminatorId)
                .OrderBy(x => x.Ship.Description).ThenBy(x => x.DiscriminatorId).ThenBy(x => x.Description).ThenBy(x => x.Batch)
                .ToListAsync();
            return mapper.Map<IEnumerable<DocumentType>, IEnumerable<DocumentTypeBrowserVM>>(DocumentTypes);
        }

        public async Task<DocumentTypeBrowserVM> GetByIdForBrowserAsync(int id) {
            var record = await context.DocumentTypes
                .AsNoTracking()
                .Include(x => x.Ship)
                .SingleOrDefaultAsync(x => x.Id == id);
            return mapper.Map<DocumentType, DocumentTypeBrowserVM>(record);
        }

        public async Task<DocumentType> GetByIdAsync(int id) {
            return await context.DocumentTypes
                .AsNoTracking()
                .Include(x => x.Ship)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public void UpdateLastNo(int id) {
            using var transaction = context.Database.BeginTransaction();
            var record = context.DocumentTypes.SingleOrDefault(x => x.Id == id);
            record.LastNo += 1;
            context.SaveChanges();
            if (testingEnvironment.IsTesting) {
                transaction.Dispose();
            } else {
                transaction.Commit();
            }
        }

    }

}