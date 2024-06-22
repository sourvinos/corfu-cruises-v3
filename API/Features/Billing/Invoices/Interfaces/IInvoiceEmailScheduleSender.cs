namespace API.Features.Billing.Invoices {

    public interface IInvoiceEmailScheduleSender {

        void SendInvoicesToEmailScheduleAsync(object state);

    }

}