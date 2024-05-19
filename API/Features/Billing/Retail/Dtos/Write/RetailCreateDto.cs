namespace API.Features.Billing.Retail {

    public class RetailCreateDto : RetailWriteDto {

        public RetailAade Aade { get; set; } = new RetailAade();

    }

}