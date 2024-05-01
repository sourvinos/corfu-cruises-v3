using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Receipts {

    public interface IReceiptCalculateBalanceRepo : IRepository<Receipt> {

        ReceiptBalanceVM CalculateBalances(ReceiptWriteDto invoice, int customerId, int shipOwnerId);
        ReceiptWriteDto AttachBalancesToCreateDto(ReceiptWriteDto invoice, ReceiptBalanceVM balances);
        decimal CalculatePreviousBalance(int customerId, int shipOwnerId);

    }

}