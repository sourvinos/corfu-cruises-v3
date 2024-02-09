using API.Infrastructure.Classes;

namespace API.Features.Billing.DocumentTypes {

    public class DocumentTypeAutoCompleteVM : SimpleEntity {

        public string Abbreviation { get; set; }
        public string Batch { get; set; }
        public bool IsActive { get; set; }

    }

}