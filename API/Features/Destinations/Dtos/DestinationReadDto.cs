﻿namespace API.Features.Destinations {

    public class DestinationReadDto {

        public int Id { get; set; }
        public string Abbreviation { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string User { get; set; }
        public string LastUpdate { get; set; }

    }

}