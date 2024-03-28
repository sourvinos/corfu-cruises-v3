using API.Infrastructure.Classes;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeBrowserStorageVM : SimpleEntity {

        public int CompanyId { get; set; }
        public string Abbreviation { get; set; }
        public string Batch { get; set; }
        public string LastDate { get; set; }
        public int LastNo { get; set; }
        public bool IsMyData { get; set; }
        public string Table8_1 { get; set; }
        public string Table8_8 { get; set; }
        public string Table8_9 { get; set; }
        public bool IsActive { get; set; }

    }

}