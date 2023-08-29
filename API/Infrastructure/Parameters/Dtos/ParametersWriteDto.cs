using System;

namespace API.Infrastructure.Parameters {

    public class ParameterWriteDto {

        public Guid Id { get; set; }
        public string ClosingTime { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }

    }

}