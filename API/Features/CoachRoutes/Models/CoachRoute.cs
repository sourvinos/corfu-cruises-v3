using System;
using System.Collections.Generic;
using API.Features.PickupPoints;
using API.Features.Ports;
using API.Infrastructure.Interfaces;

namespace API.Features.CoachRoutes {

    public class CoachRoute : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // FKs
        public int PortId { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public bool HasTransfer { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // RowVersion
        public DateTime RowVersion { get; set; }
        // Navigation
        public Port Port { get; set; }
        public List<PickupPoint> PickupPoints { get; set; }

    }

}