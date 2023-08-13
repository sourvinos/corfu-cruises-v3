using System;

namespace API.Infrastructure.Parameters {

    public class ParameterReadDto {

        public Guid Id { get; set; }
        public string ClosingTime { get; set; }
        public string Phones { get; set; }
        public string User { get; set; }
        public string LastUpdate { get; set; }

    }

}