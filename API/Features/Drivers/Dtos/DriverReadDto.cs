namespace API.Features.Drivers {

    public class DriverReadDto {

        public int Id { get; set; }
        public string Description { get; set; }
        public string Phones { get; set; }
        public bool IsActive { get; set; }
        public string User { get; set; }
        public string LastUpdate { get; set; }

    }

}