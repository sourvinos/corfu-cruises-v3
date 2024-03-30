using AutoMapper;

namespace API.Features.Billing.Invoices {

    public class InvoiceXmlMappingProfile : Profile {

        public InvoiceXmlMappingProfile() {
            CreateMap<Invoice, XmlBuilderInvoiceVM>()
                .ForMember(x => x.Credentials, x => x.MapFrom(x => new XmlCredentialsVM {
                    Username = x.Ship.ShipOwner.DemoUsername,
                    SubscriptionKey = x.Ship.ShipOwner.DemoSubscriptionKey,
                    Url = x.Ship.ShipOwner.DemoUrl
                }))
                .ForMember(x => x.Issuer, x => x.MapFrom(x => new XmlPartyVM {
                    VatNumber = x.Ship.ShipOwner.VatNumber,
                    Country = x.Ship.ShipOwner.Nationality.Code,
                    Branch = x.Ship.ShipOwner.Branch,
                    Address = new XmlAddressVM {
                        Street = x.Ship.ShipOwner.Street,
                        Number = x.Ship.ShipOwner.Number,
                        PostalCode = x.Ship.ShipOwner.PostalCode,
                        City = x.Ship.ShipOwner.City
                    }
                }))
                .ForMember(x => x.CounterPart, x => x.MapFrom(x => new XmlPartyVM {
                    VatNumber = x.Customer.VatNumber,
                    Country = x.Customer.Nationality.Code,
                    Branch = x.Customer.Branch,
                    Address = new XmlAddressVM {
                        Street = x.Customer.Street,
                        Number = x.Customer.Number,
                        PostalCode = x.Customer.PostalCode,
                        City = x.Customer.City
                    }
                }))
                .ForMember(x => x.InvoiceHeader, x => x.MapFrom(x => new XmlInvoiceHeaderVM {
                    Series = x.DocumentType.Batch,
                    Aa = x.InvoiceNo.ToString(),
                    IssueDate = x.Date.ToString(),
                    InvoiceType = x.DocumentType.Table8_1,
                    Currency = "EUR"
                }));
        }
    }

}