using API.Features.Billing.Transactions;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Billing.Ledgers {

    public class LedgerMappingProfile : Profile {

        public LedgerMappingProfile() {
            CreateMap<TransactionBase, LedgerVM>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                .ForMember(x => x.Customer, x => x.MapFrom(source => new SimpleEntity {
                    Id = source.Customer.Id,
                    Description = source.Customer.Description
                }))
                .ForMember(x => x.DocumentType, x => x.MapFrom(source => new DocumentTypeVM {
                    Id = source.DocumentType.Id,
                    Abbreviation = source.DocumentType.Abbreviation,
                    Batch = source.DocumentType.Batch,
                    InvoiceNumber = source.InvoiceNo
                }))
                .ForMember(x => x.Debit, x => x.MapFrom(source => source.DocumentType.Customers == "+" || source.DocumentType.Suppliers == "-" ? source.GrossAmount : 0))
                .ForMember(x => x.Credit, x => x.MapFrom(source => source.DocumentType.Customers == "-" || source.DocumentType.Suppliers == "+" ? source.GrossAmount : 0));
        }

    }

}