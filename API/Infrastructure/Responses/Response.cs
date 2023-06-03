namespace API.Infrastructure.Responses {

    public class Response : IResponse {

        public int Code { get; set; }
        public string Icon { get; set; }
        public object Id { get; set; }
        public string Message { get; set; }

    }

}