using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Reservations.Registrars {

    internal class RegistrarsConfig : IEntityTypeConfiguration<Registrar> {

        public void Configure(EntityTypeBuilder<Registrar> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.ShipId).IsRequired(true);
            // Fields
            entity.Property(x => x.Fullname).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Phones).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Email).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Fax).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Address).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.IsPrimary).IsRequired(true);
            entity.Property(x => x.IsActive).IsRequired(true);
            // Metadata
            entity.Property(x => x.PostAt).HasMaxLength(19).IsRequired(true);
            entity.Property(x => x.PostUser).HasMaxLength(255).IsRequired(true);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(255);
            // FK Constraints
            entity.HasOne(x => x.Ship).WithMany(x => x.Registrars).HasForeignKey(x => x.ShipId).OnDelete(DeleteBehavior.Restrict);
        }

    }

}