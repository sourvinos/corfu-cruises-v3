using API.Infrastructure.Interfaces;

namespace API.Features.Billing.BankAccounts {

    public interface IBankAccountValidation : IRepository<BankAccount> {

        int IsValid(BankAccount x, BankAccountWriteDto bankAccount);

    }

}