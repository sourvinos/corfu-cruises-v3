using API.Infrastructure.Interfaces;

namespace API.Features.Billing.TaxOffices {

    public interface ITaxOfficeValidation : IRepository<TaxOffice> {

        int IsValid(TaxOffice x, TaxOfficeWriteDto taxOffice);

    }

}