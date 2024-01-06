using API.Infrastructure.Interfaces;

namespace API.Features.Billing.VatRegimes {

    public interface IVatRegimeValidation : IRepository<VatRegime> {

        int IsValid(VatRegime x, VatRegimeWriteDto vatRegime);

    }

}