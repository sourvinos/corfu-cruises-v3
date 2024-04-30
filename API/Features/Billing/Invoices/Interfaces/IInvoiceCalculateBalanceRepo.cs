using API.Infrastructure.Interfaces;

namespace API.Features.Billing.Invoices {

    public interface IInvoiceCalculateBalanceRepo : IRepository<Invoice> {

        InvoiceBalanceVM CalculateBalances(InvoiceCreateDto invoice, int customerId, int shipOwnerId);
        InvoiceCreateDto AttachBalancesToCreateDto(InvoiceCreateDto invoice, InvoiceBalanceVM balances);
        decimal CalculatePreviousBalance(int customerId, int shipOwnerId);

    }

}