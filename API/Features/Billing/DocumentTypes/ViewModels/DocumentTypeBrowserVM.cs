namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeBrowserVM {

        public int Id { get; set; }
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public int CompanyId { get; set; }
        public string Batch { get; set; }
        public int LastNo { get; set; }
        public bool IsActive { get; set; }

    }

}