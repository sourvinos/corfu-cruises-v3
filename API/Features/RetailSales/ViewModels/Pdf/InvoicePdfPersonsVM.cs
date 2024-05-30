namespace API.Features.RetailSales {

    public class InvoicePdfPaxAndPricesVM {

        public int Adults { get; set; }
        public decimal AdultsPrice { get; set; }
        public decimal AdultsTotalPrice { get; set; }
        public int Kids { get; set; }
        public decimal KidsPrice { get; set; }
        public decimal KidsTotalPrice { get; set; }
        public int Free { get; set; }
        public int TotalPax { get; set; }
        public decimal TotalPrice { get; set; }

    }

}