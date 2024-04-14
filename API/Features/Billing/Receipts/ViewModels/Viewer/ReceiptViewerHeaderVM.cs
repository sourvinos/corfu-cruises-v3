namespace API.Features.Billing.Receipts {

    public class ReceiptViewerHeaderVM {

        public string Date { get; set; }
        public string TripDate { get; set; }
        public ReceiptViewerDocumentTypeVM DocumentType { get; set; }
        public int InvoiceNo { get; set; }

    }

}