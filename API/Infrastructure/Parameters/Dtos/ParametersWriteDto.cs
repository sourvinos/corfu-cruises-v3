using System;

namespace API.Infrastructure.Parameters {

    public class ParameterWriteDto {

        public Guid Id { get; set; }
        public string ClosingTime { get; set; }
        public string UserId { get; set; }

    }

}