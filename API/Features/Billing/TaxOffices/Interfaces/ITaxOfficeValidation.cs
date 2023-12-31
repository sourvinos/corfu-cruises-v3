using API.Infrastructure.Interfaces;

namespace API.Features.TaxOffices {

    public interface ITaxOfficeValidation : IRepository<TaxOffice> {

        int IsValid(TaxOffice x, TaxOfficeWriteDto taxOffice);

    }

}