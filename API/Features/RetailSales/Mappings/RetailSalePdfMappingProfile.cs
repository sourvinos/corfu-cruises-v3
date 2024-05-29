using System.Linq;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.RetailSales {

    public class RetailSalePdfMappingProfile : Profile {

        public RetailSalePdfMappingProfile() {
            CreateMap<RetailSale, InvoicePdfVM>()
                .ForMember(x => x.Issuer, x => x.MapFrom(x => new InvoicePdfPartyVM {
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
                .ForMember(x => x.DocumentType, x => x.MapFrom(x => new InvoicePdfDocumentTypeVM {
                    Description = x.DocumentType.Description,
                    Batch = x.DocumentType.Batch
                }))
                .ForMember(x => x.Header, x => x.MapFrom(x => new InvoicePdfHeaderVM {
                    Date = DateHelpers.DateToISOString(x.Date),
                    InvoiceNo = x.InvoiceNo,
                    PaymentMethod = x.PaymentMethod.Description
                }))
                .ForMember(x => x.Reservation, x => x.MapFrom(x => new InvoicePdfReservationVM {
                    ReservationId = x.Reservation.ReservationId.ToString(),
                    Date = DateHelpers.DateToISOString(x.Reservation.Date),
                    RefNo = x.Reservation.RefNo,
                    TicketNo = x.Reservation.TicketNo,
                    Destination = x.Reservation.Destination.Description,
                    Customer = x.Reservation.Customer.Description,
                }))
                .ForMember(x => x.Passengers, x => x.MapFrom(x => x.Reservation.Passengers.Select(passenger => new InvoicePdfPassengerVM {
                    Lastname = passenger.Lastname,
                    Firstname = passenger.Firstname
                })))
                .ForMember(x => x.Summary, x => x.MapFrom(x => new InvoicePdfSummaryVM {
                    NetAmount = x.NetAmount,
                    VatPercent = x.VatPercent,
                    VatAmount = x.VatAmount,
                    GrossAmount = x.GrossAmount
                }))
                .ForMember(x => x.BankAccounts, x => x.MapFrom(x => x.ShipOwner.BankAccounts.Select(bankAccount => new SimpleEntity {
                    Id = bankAccount.Bank.Id,
                    Description = bankAccount.Bank.Description + " " + bankAccount.Iban
                })))
                .ForMember(x => x.Aade, x => x.MapFrom(x => new InvoicePdfAadeVM {
                    UId = x.Uid,
                    Mark = x.Mark,
                    QrUrl = x.QrUrl
                }))

                ;
        }

    }

}