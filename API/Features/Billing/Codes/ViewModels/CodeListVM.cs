using System;

namespace API.Features.Codes {

    public class CodeListVM {

        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Batch { get; set; }
        public string LastDate { get; set; }
        public int LastNo { get; set; }
        public bool IsActive { get; set; }

    }

}