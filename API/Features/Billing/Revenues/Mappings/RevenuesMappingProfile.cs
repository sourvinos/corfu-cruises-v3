using API.Features.Billing.Transactions;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Billing.Revenues {

    public class RevenuesMappingProfile : Profile {

        public RevenuesMappingProfile() {
            CreateMap<TransactionsBase, RevenuesVM>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                .ForMember(x => x.Customer, x => x.MapFrom(source => new SimpleEntity {
                    Id = source.Customer.Id,
                    Description = source.Customer.Description
                }))
                .ForMember(x => x.InvoiceNo, x => x.MapFrom(x => x.InvoiceNo.ToString()))
                .ForMember(x => x.Debit, x => x.MapFrom(source => source.DocumentType.Customers == "+" || source.DocumentType.Suppliers == "-" ? source.GrossAmount : 0))
                .ForMember(x => x.Credit, x => x.MapFrom(source => source.DocumentType.Customers == "-" || source.DocumentType.Suppliers == "+" ? source.GrossAmount : 0));
        }

    }

}