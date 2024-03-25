using System.Linq;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Billing.Invoices {

    public class InvoiceMappingProfile : Profile {

        public InvoiceMappingProfile() {
            // List
            CreateMap<Invoice, InvoiceListVM>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                .ForMember(x => x.Customer, x => x.MapFrom(x => new SimpleEntity { Id = x.Customer.Id, Description = x.Customer.Description }))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new SimpleEntity { Id = x.Destination.Id, Description = x.Destination.Description }))
                .ForMember(x => x.DocumentType, x => x.MapFrom(x => new DocumentTypeVM { Id = x.DocumentType.Id, Description = x.DocumentType.Description, Batch = x.DocumentType.Batch }))
                .ForMember(x => x.Ship, x => x.MapFrom(x => new SimpleEntity { Id = x.Ship.Id, Description = x.Ship.Description }));
            // GetById
            CreateMap<Invoice, InvoiceReadDto>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                .ForMember(x => x.TripDate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.TripDate)))
                .ForMember(x => x.Customer, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Customer.Id,
                    Description = x.Customer.Description
                }))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Destination.Id,
                    Description = x.Destination.Description
                }))
                .ForMember(x => x.DocumentType, x => x.MapFrom(x => new DocumentTypeVM {
                    Id = x.DocumentType.Id,
                    Abbreviation = x.DocumentType.Abbreviation,
                    Description = x.DocumentType.Description,
                    Batch = x.DocumentType.Batch
                }))
                .ForMember(x => x.Ship, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Ship.Id,
                    Description = x.Ship.Description
                }))
                .ForMember(x => x.PaymentMethod, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.PaymentMethod.Id,
                    Description = x.PaymentMethod.Description
                }))
                .ForMember(x => x.Aade, x => x.MapFrom(x => new AadeVM {
                    InvoiceId = x.Aade.InvoiceId,
                    UId = x.Aade.Uid,
                    Mark = x.Aade.Mark,
                    MarkCancel = x.Aade.MarkCancel,
                    QrUrl = x.Aade.QrUrl
                }))
                .ForMember(x => x.InvoicesPorts, x => x.MapFrom(x => x.InvoicesPorts.Select(port => new InvoicePortReadDto {
                    Id = port.Id,
                    InvoiceId = port.InvoiceId,
                    Port = new SimpleEntity {
                        Id = port.Port.Id,
                        Description = port.Port.Description
                    },
                    AdultsWithTransfer = port.AdultsWithTransfer,
                    AdultsPriceWithTransfer = port.AdultsPriceWithTransfer,
                    AdultsWithoutTransfer = port.AdultsWithoutTransfer,
                    AdultsPriceWithoutTransfer = port.AdultsPriceWithoutTransfer,
                    KidsWithTransfer = port.KidsWithTransfer,
                    KidsPriceWithTransfer = port.KidsPriceWithTransfer,
                    KidsWithoutTransfer = port.KidsWithoutTransfer,
                    KidsPriceWithoutTransfer = port.KidsPriceWithoutTransfer,
                    FreeWithTransfer = port.FreeWithTransfer,
                    FreeWithoutTransfer = port.FreeWithoutTransfer,
                    TotalPax = port.TotalPax,
                    TotalAmount = port.TotalAmount
                })));
            // Create invoice
            CreateMap<InvoiceCreateDto, Invoice>()
                .ForMember(x => x.DiscriminatorId, x => x.MapFrom(x => 1))
                .ForMember(x => x.Aade, x => x.MapFrom(x => new InvoiceAade {
                    InvoiceId = x.InvoiceId,
                    Uid = "",
                    Mark = "",
                    MarkCancel = "",
                    QrUrl = ""
                }))
                .ForMember(x => x.Remarks, x => x.MapFrom(x => x.Remarks.Trim()));
            // Update invoice
            CreateMap<InvoiceUpdateDto, Invoice>();
            // Update aade
            CreateMap<InvoiceUpdateDto, InvoiceAade>();
            // Write port
            CreateMap<InvoicePortWriteDto, InvoicePort>();
            // Write response
            CreateMap<InvoiceCreateDto, InvoiceWriteResponseDto>()
                .ForMember(x => x.Date, x => x.MapFrom(x => x.Date))
                .ForMember(x => x.No, x => x.MapFrom(x => x.InvoiceNo))
                .ForMember(x => x.ShipId, x => x.MapFrom(x => x.ShipId))
                .ForMember(x => x.CounterPartId, x => x.MapFrom(x => x.CustomerId))
                .ForMember(x => x.DocumentTypeId, x => x.MapFrom(x => x.DocumentTypeId))
                .ForMember(x => x.PaymentMethodId, x => x.MapFrom(x => x.PaymentMethodId))
                .ForMember(x => x.Currency, x => x.MapFrom(x => "EUR"))
                .ForMember(x => x.NetAmount, x => x.MapFrom(x => x.NetAmount))
                .ForMember(x => x.VatCategory, x => x.MapFrom(x => 2))
                .ForMember(x => x.VatAmount, x => x.MapFrom(x => x.VatAmount))
                .ForMember(x => x.GrossAmount, x => x.MapFrom(x => x.GrossAmount));
            // Viewer
            CreateMap<Invoice, InvoiceViewerVM>()
                .ForMember(x => x.Header, x => x.MapFrom(x => new InvoiceViewerHeaderVM {
                    Date = DateHelpers.DateToISOString(x.Date),
                    TripDate = DateHelpers.DateToISOString(x.TripDate),
                    DocumentType = new InvoiceViewerDocumentTypeVM {
                        Description = x.DocumentType.Description,
                        Batch = x.DocumentType.Batch
                    },
                    InvoiceNo = x.InvoiceNo
                }))
                .ForMember(x => x.Customer, x => x.MapFrom(x => new InvoiceViewerPartyVM {
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
                .ForMember(x => x.Destination, x => x.MapFrom(x => x.Destination.Description))
                .ForMember(x => x.Ship, x => x.MapFrom(x => new InvoiceViewerShipVM {
                    Description = x.Ship.Description,
                    RegistryNo = x.Ship.RegistryNo
                }))
                .ForMember(x => x.DocumentType, x => x.MapFrom(x => new InvoiceViewerDocumentTypeVM {
                    Description = x.DocumentType.Description,
                    Batch = x.DocumentType.Batch
                }))
                .ForMember(x => x.Issuer, x => x.MapFrom(x => new InvoiceViewerPartyVM {
                    FullDescription = x.Ship.ShipOwner.Description,
                    VatNumber = x.Ship.ShipOwner.VatNumber,
                    Branch = x.Ship.ShipOwner.Branch,
                    Profession = x.Ship.ShipOwner.Profession,
                    Street = x.Ship.ShipOwner.Street,
                    Number = x.Ship.ShipOwner.Number,
                    PostalCode = x.Ship.ShipOwner.PostalCode,
                    City = x.Ship.ShipOwner.City,
                    Phones = x.Ship.ShipOwner.Phones,
                    Email = x.Ship.ShipOwner.Email,
                    Nationality = x.Ship.ShipOwner.Nationality.Description,
                    TaxOffice = x.Ship.ShipOwner.TaxOffice.Description
                }))
                .ForMember(x => x.PaymentMethod, x => x.MapFrom(x => x.PaymentMethod.Description))
                .ForMember(x => x.Aade, x => x.MapFrom(x => new InvoiceViewerAadeVM {
                    UId = x.Aade.Uid,
                    Mark = x.Aade.Mark,
                    MarkCancel = x.Aade.MarkCancel,
                    QrUrl = x.Aade.QrUrl
                }))
                .ForMember(x => x.Ports, x => x.MapFrom(x => x.InvoicesPorts.Select(port => new InvoiceViewerPortVM {
                    Port = port.Port.Description,
                    AdultsWithTransfer = port.AdultsWithTransfer,
                    AdultsPriceWithTransfer = port.AdultsPriceWithTransfer,
                    AdultsWithoutTransfer = port.AdultsWithoutTransfer,
                    AdultsPriceWithoutTransfer = port.AdultsPriceWithoutTransfer,
                    KidsWithTransfer = port.KidsWithTransfer,
                    KidsPriceWithTransfer = port.KidsPriceWithTransfer,
                    KidsWithoutTransfer = port.KidsWithoutTransfer,
                    KidsPriceWithoutTransfer = port.KidsPriceWithoutTransfer,
                    FreeWithTransfer = port.FreeWithTransfer,
                    FreeWithoutTransfer = port.FreeWithoutTransfer,
                    TotalPax = port.TotalPax,
                    TotalAmount = port.TotalAmount
                })))
                .ForMember(x => x.Summary, x => x.MapFrom(x => new InvoiceViewerSummaryVM {
                    NetAmount = x.NetAmount,
                    VatPercent = x.VatPercent,
                    VatAmount = x.VatAmount,
                    GrossAmount = x.GrossAmount
                }));
            CreateMap<Invoice, InvoiceBalanceVM>()
                .ForMember(x => x.PreviousBalance, x => x.MapFrom(x => x.PreviousBalance))
                .ForMember(x => x.NewBalance, x => x.MapFrom(x => x.NewBalance));
        }

    }

}