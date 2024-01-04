using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.PaymentMethods {

    public class PaymentMethodRepository : Repository<PaymentMethod>, IPaymentMethodRepository {

        private readonly IMapper mapper;

        public PaymentMethodRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<PaymentMethodListVM>> GetAsync() {
            var paymentMethods = await context.PaymentMethods
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<PaymentMethod>, IEnumerable<PaymentMethodListVM>>(paymentMethods);
        }

        public async Task<IEnumerable<PaymentMethodAutoCompleteVM>> GetAutoCompleteAsync() {
            var paymentMethods = await context.PaymentMethods
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<PaymentMethod>, IEnumerable<PaymentMethodAutoCompleteVM>>(paymentMethods);
        }

        public async Task<PaymentMethod> GetByIdAsync(string id) {
            return await context.PaymentMethods
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id.ToString() == id);
        }

    }

}