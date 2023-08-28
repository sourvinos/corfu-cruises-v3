using System;
using API.Features.Destinations;
using API.Features.Ports;
using API.Features.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Schedules {

    public class Schedule : IMetadataWrite {

        // PK
        public int Id { get; set; }
        // FK
        public int DestinationId { get; set; }
        public int PortId { get; set; }
        // Fields
        public DateTime Date { get; set; }
        public int MaxPax { get; set; }
        public string Time { get; set; }
        public bool IsActive { get; set; }
        // Navigation
                public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }
        public Destination Destination { get; set; }
        public Port Port { get; set; }
        public UserExtended User { get; set; }

    }

}