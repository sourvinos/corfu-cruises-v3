using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.ShipRoutes {

    internal class ShipRoutesConfig : IEntityTypeConfiguration<ShipRoute> {

        public void Configure(EntityTypeBuilder<ShipRoute> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.FromPort).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.FromTime).HasMaxLength(5).IsRequired(true);
            entity.Property(x => x.ViaPort).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.ViaTime).HasDefaultValue("").HasMaxLength(5);
            entity.Property(x => x.ToPort).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.ToTime).HasMaxLength(5).IsRequired(true);
            entity.Property(x => x.IsActive);
            entity.Property(x => x.PostAt).HasMaxLength(19);
            entity.Property(x => x.PostUser).HasMaxLength(255);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(255);
        }

    }

}