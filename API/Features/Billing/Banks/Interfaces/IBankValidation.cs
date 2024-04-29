using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Banks {

    public interface IBankValidation : IRepository<Bank> {

        int IsValid(Bank x, BankWriteDto bank);

    }

}