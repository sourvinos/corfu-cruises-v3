using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Billing.Receipts {

    public class ReceiptViewerMappingProfile : Profile {

        public ReceiptViewerMappingProfile() {
            CreateMap<Receipt, ReceiptViewerVM>()
                .ForMember(x => x.Header, x => x.MapFrom(x => new ReceiptViewerHeaderVM {
                    Date = DateHelpers.DateToISOString(x.Date),
                    TripDate = DateHelpers.DateToISOString(x.TripDate),
                    DocumentType = new ReceiptViewerDocumentTypeVM {
                        Description = x.DocumentType.Description,
                        Batch = x.DocumentType.Batch
                    },
                    InvoiceNo = x.InvoiceNo
                }))
                .ForMember(x => x.Customer, x => x.MapFrom(x => new ReceiptViewerPartyVM {
                    FullDescription = x.Customer.FullDescription,
                    VatNumber = x.Customer.VatNumber,
                    Branch = x.Customer.Branch,
                    Profession = x.Customer.Profession,
                    Street = x.Customer.Street,
                    Number = x.Customer.Number,
                    PostalCode = x.Customer.PostalCode,
                    City = x.Customer.City,
                    Phones = x.Customer.Phones,
                    Email = x.Customer.Email,
                    Nationality = x.Customer.Nationality.Description,
                    TaxOffice = x.Customer.TaxOffice.Description
                }))
                .ForMember(x => x.DocumentType, x => x.MapFrom(x => new ReceiptViewerDocumentTypeVM {
                    Description = x.DocumentType.Description,
                    Batch = x.DocumentType.Batch
                }))
                .ForMember(x => x.Issuer, x => x.MapFrom(x => new ReceiptViewerPartyVM {
                    FullDescription = x.ShipOwner.Description,
                    VatNumber = x.ShipOwner.VatNumber,
                    Branch = x.ShipOwner.Branch,
                    Profession = x.ShipOwner.Profession,
                    Street = x.ShipOwner.Street,
                    Number = x.ShipOwner.Number,
                    PostalCode = x.ShipOwner.PostalCode,
                    City = x.ShipOwner.City,
                    Phones = x.ShipOwner.Phones,
                    Email = x.ShipOwner.Email,
                    Nationality = x.ShipOwner.Nationality.Description,
                    TaxOffice = x.ShipOwner.TaxOffice.Description
                }))
                .ForMember(x => x.PaymentMethod, x => x.MapFrom(x => x.PaymentMethod.Description))
                .ForMember(x => x.Amount, x => x.MapFrom(x => x.GrossAmount));
            CreateMap<Receipt, ReceiptBalanceVM>()
                .ForMember(x => x.PreviousBalance, x => x.MapFrom(x => x.PreviousBalance))
                .ForMember(x => x.NewBalance, x => x.MapFrom(x => x.NewBalance));
        }

    }

}