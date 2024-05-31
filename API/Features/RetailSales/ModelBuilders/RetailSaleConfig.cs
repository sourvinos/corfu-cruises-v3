using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.RetailSales {

    internal class RetailSaleConfig : IEntityTypeConfiguration<RetailSale> {

        public void Configure(EntityTypeBuilder<RetailSale> entity) {
            entity.Property(x => x.TotalPax).HasComputedColumnSql("((`Adults` + `Kids`) + `Free`)", stored: false);
            entity.Property(x => x.NetAmount).HasComputedColumnSql("(((`Adults` * `AdultsPrice`) + (`Kids` * `KidsPrice`)) / (1 + (`VatPercent` / 100)))", stored: false);
            entity.Property(x => x.VatAmount).HasComputedColumnSql("(`GrossAmount` - `NetAmount`)", stored: false);
            entity.Property(x => x.GrossAmount).HasComputedColumnSql("((`NetAmount` + `VatAmount`))", stored: false);
        }

    }

}