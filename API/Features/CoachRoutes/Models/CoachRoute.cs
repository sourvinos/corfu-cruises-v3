using System.Collections.Generic;
using API.Features.PickupPoints;
using API.Features.Ports;
using API.Features.Users;
using AutoMapper.Configuration.Annotations;

namespace API.Features.CoachRoutes {

    public class CoachRoute {

        // PK
        public int Id { get; set; }
        // FKs
        public int PortId { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public bool HasTransfer { get; set; }
        public bool IsActive { get; set; }
        // // Navigation
        public Port Port { get; set; }
        public UserExtended PostUser { get; set; }
        public UserExtended PutUser { get; set; }
        public List<PickupPoint> PickupPoints { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUserId { get; set; }
        public string PutAt { get; set; }
        public string PutUserId { get; set; }

    }

}