using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Settings {

    internal class SettingsConfig : IEntityTypeConfiguration<Setting> {

        public void Configure(EntityTypeBuilder<Setting> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.UserId).HasMaxLength(36).IsRequired(true);
            // Fields
            entity.Property(x => x.ClosingTime).HasMaxLength(5).IsRequired(true);
            entity.Property(x => x.LastUpdate).HasMaxLength(19);
            // FK Constraints
            entity.HasOne(x => x.User).WithMany(x => x.Settings).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
        }

    }

}