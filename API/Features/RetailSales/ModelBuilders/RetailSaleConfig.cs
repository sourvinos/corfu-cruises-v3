using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.RetailSales {

    internal class RetailSaleConfig : IEntityTypeConfiguration<RetailSale> {

        public void Configure(EntityTypeBuilder<RetailSale> entity) {
            entity.HasKey(x => x.Id);
        }

    }

}