using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.CoachRoutes {

    internal class CoachRoutesConfig : IEntityTypeConfiguration<CoachRoute> {

        public void Configure(EntityTypeBuilder<CoachRoute> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.PortId).IsRequired(true);
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Abbreviation).HasMaxLength(10).IsRequired(true);
            entity.Property(x => x.HasTransfer);
            entity.Property(x => x.IsActive);
            entity.Property(x => x.PostAt).HasMaxLength(19);
            entity.Property(x => x.PostUser).HasMaxLength(255);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(255);
            // FK Constraints
            entity.HasOne(x => x.Port).WithMany(x => x.CoachRoutes).HasForeignKey(x => x.PortId).OnDelete(DeleteBehavior.Restrict);
        }

    }

}