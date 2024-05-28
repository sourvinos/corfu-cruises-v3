using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.RetailSales {

    public class RetailSaleXmlMappingProfile : Profile {

        public RetailSaleXmlMappingProfile() {
            CreateMap<RetailSale, RetailSaleXmlBuilderVM>()
                .ForMember(x => x.Credentials, x => x.MapFrom(x => new XmlCredentialsVM {
                    Username = x.ShipOwner.IsDemoMyData ? x.ShipOwner.DemoUsername : x.ShipOwner.LiveUsername,
                    SubscriptionKey = x.ShipOwner.IsDemoMyData ? x.ShipOwner.DemoSubscriptionKey : x.ShipOwner.LiveSubscriptionKey,
                    Url = x.ShipOwner.IsDemoMyData ? x.ShipOwner.DemoUrl : x.ShipOwner.LiveUrl
                }))
                .ForMember(x => x.Issuer, x => x.MapFrom(x => new XmlIssuerVM {
                    VatNumber = x.ShipOwner.VatNumber,
                    Country = x.ShipOwner.Nationality.Code,
                    Branch = x.ShipOwner.Branch,
                    Address = new XmlAddressVM {
                        Street = x.ShipOwner.Street,
                        Number = x.ShipOwner.Number,
                        PostalCode = x.ShipOwner.PostalCode,
                        City = x.ShipOwner.City
                    }
                }))
                .ForMember(x => x.InvoiceHeader, x => x.MapFrom(x => new XmlRetailSaleHeaderVM {
                    Series = x.DocumentType.Batch,
                    Aa = x.InvoiceNo.ToString(),
                    IssueDate = DateHelpers.DateToISOString(x.Date),
                    InvoiceType = x.DocumentType.Table8_1,
                    Currency = "EUR"
                }))
                .ForMember(x => x.PaymentMethod, x => x.MapFrom(x => new XmlPaymentMethodVM {
                    PaymentMethodDetail = new XmlPaymentMethodDetailVM {
                        Type = x.PaymentMethod.MyDataId,
                        Amount = x.GrossAmount
                    }
                }))
                .ForMember(x => x.InvoiceDetail, x => x.MapFrom(x => new XmlRetailSaleRowVM {
                    LineNumber = 1,
                    NetValue = x.NetAmount,
                    VatCategory = x.ShipOwner.VatPercentId,
                    VatAmount = x.VatAmount
                }))
                .ForMember(x => x.InvoiceSummary, x => x.MapFrom(x => new XmlRetailSaleSummaryVM {
                    TotalNetValue = x.NetAmount,
                    TotalVatAmount = x.VatAmount,
                    TotalWithheldAmount = 0,
                    TotalFeesAmount = 0,
                    TotalStampDutyAmount = 0,
                    TotalOtherTaxesAmount = 0,
                    TotalDeductionsAmount = 0,
                    TotalGrossValue = x.GrossAmount,
                    IncomeClassification = new XmlIncomeClassificationVM {
                        ClassificationType = x.DocumentType.Table8_9,
                        ClassificationCategory = x.DocumentType.Table8_8,
                        Amount = x.NetAmount
                    }
                }))
                .ForMember(x => x.Aade, x => x.MapFrom(x => new XmlAadeVM {
                    InvoiceId = x.ReservationId,
                    UId = x.Uid,
                    Mark = x.Mark,
                    MarkCancel = x.MarkCancel,
                    QrUrl = x.QrUrl
                }));
        }
    }

}