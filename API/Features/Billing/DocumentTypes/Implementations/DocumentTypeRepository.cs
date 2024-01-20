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

        public DocumentTypeRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<DocumentTypeListVM>> GetAsync() {
            var DocumentTypes = await context.DocumentTypes
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<DocumentType>, IEnumerable<DocumentTypeListVM>>(DocumentTypes);
        }

        public async Task<IEnumerable<DocumentTypeAutoCompleteVM>> GetAutoCompleteAsync() {
            var DocumentTypes = await context.DocumentTypes
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<DocumentType>, IEnumerable<DocumentTypeAutoCompleteVM>>(DocumentTypes);
        }

        public async Task<DocumentType> GetByIdAsync(int id) {
            return await context.DocumentTypes
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}