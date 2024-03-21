namespace API.Features.Billing.Invoices {

    public class InvoiceViewerPortVM {

        public string Port { get; set; }
        public int AdultsWithTransfer { get; set; }
        public decimal AdultsPriceWithTransfer { get; set; }
        public int AdultsWithoutTransfer { get; set; }
        public decimal AdultsPriceWithoutTransfer { get; set; }
        public int KidsWithTransfer { get; set; }
        public decimal KidsPriceWithTransfer { get; set; }
        public int KidsWithoutTransfer { get; set; }
        public decimal KidsPriceWithoutTransfer { get; set; }
        public int FreeWithTransfer { get; set; }
        public int FreeWithoutTransfer { get; set; }
        public int TotalPax { get; set; }
        public decimal TotalAmount { get; set; }

    }

}