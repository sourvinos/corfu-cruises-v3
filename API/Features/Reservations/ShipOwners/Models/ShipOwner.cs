using System.Collections.Generic;
using API.Features.Billing.BankAccounts;
using API.Features.Billing.TaxOffices;
using API.Features.Billing.VatRegimes;
using API.Features.Reservations.Nationalities;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.ShipOwners {

    public class ShipOwner : IPartyType {

        // PK
        public int Id { get; set; }
        // FKs
        public int NationalityId { get; set; }
        public int TaxOfficeId { get; set; }
        public int VatRegimeId { get; set; }
        // Fields
        public string Description { get; set; }
        public string DescriptionEn { get; set; }
        public string VatNumber { get; set; }
        public int VatMyDataId { get; set; }
        public decimal VatPercent { get; set; }
        public int Branch { get; set; }
        public string Profession { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string PersonInCharge { get; set; }
        public string Phones { get; set; }
        public string Email { get; set; }
        public bool IsGroupJP { get; set; }
        public bool IsActive { get; set; }
        // myData
        public string DemoUrl { get; set; }
        public string DemoUsername { get; set; }
        public string DemoSubscriptionKey { get; set; }
        public string LiveUrl { get; set; }
        public string LiveUsername { get; set; }
        public string LiveSubscriptionKey { get; set; }
        public bool IsDemoMyData { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public Nationality Nationality { get; set; }
        public TaxOffice TaxOffice { get; set; }
        public VatRegime VatRegime { get; set; }
        public List<BankAccount> BankAccounts { get; set; }

    }

}