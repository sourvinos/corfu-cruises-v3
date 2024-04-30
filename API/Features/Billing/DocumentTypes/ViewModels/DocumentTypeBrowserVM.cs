using API.Infrastructure.Classes;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeBrowserVM {

        public int Id { get; set; }
        public SimpleEntity Ship { get; set; }
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public string Batch { get; set; }
        public bool IsActive { get; set; }

    }

}