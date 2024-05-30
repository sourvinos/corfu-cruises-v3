using System.Collections.Generic;
using API.Infrastructure.Classes;

namespace API.Features.RetailSales {

    public class InvoicePdfVM {

        public string ReservationId { get; set; }
        public InvoicePdfPartyVM Issuer { get; set; }
        public InvoicePdfDocumentTypeVM DocumentType { get; set; }
        public InvoicePdfHeaderVM Header { get; set; }
        public InvoicePdfReservationVM Reservation { get; set; }
        public InvoicePdfPaxAndPricesVM Persons { get; set; }
        public List<InvoicePdfPassengerVM> Passengers { get; set; }
        public InvoicePdfAadeVM Aade { get; set; }
        public InvoicePdfSummaryVM Summary { get; set; }
        public SimpleEntity[] BankAccounts { get; set; }

    }

}