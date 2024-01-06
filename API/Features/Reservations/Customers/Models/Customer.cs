using System;
using System.Collections.Generic;
using API.Features.Reservations.Nationalities;
using API.Features.Billing.TaxOffices;
using API.Features.Billing.VatRegimes;
using API.Infrastructure.Interfaces;
using API.Features.Reservations.Reservations;

namespace API.Features.Reservations.Customers {

    public class Customer : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fks
        public Guid TaxOfficeId { get; set; }
        public Guid VatRegimeId { get; set; }
        public int NationalityId { get; set; }
        // Fields
        public string Description { get; set; }
        public string TaxNo { get; set; }
        public string Profession { get; set; }
        public string Address { get; set; }
        public string Phones { get; set; }
        public string PersonInCharge { get; set; }
        public string Email { get; set; }
        public decimal BalanceLimit { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public Nationality Nationality { get; set; }
        public TaxOffice TaxOffice { get; set; }
        public VatRegime VatRegime { get; set; }
        public List<Reservation> Reservations { get; set; }

    }

}