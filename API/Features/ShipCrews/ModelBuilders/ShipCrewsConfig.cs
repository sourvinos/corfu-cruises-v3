using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.ShipCrews {

    internal class ShipCrewsConfig : IEntityTypeConfiguration<ShipCrew> {

        public void Configure(EntityTypeBuilder<ShipCrew> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.GenderId).IsRequired(true);
            entity.Property(x => x.NationalityId).IsRequired(true);
            entity.Property(x => x.OccupantId).HasDefaultValue(1);
            entity.Property(x => x.ShipId).IsRequired(true);
            // Fields
            entity.Property(x => x.Lastname).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Firstname).HasMaxLength(128).IsRequired(true);
            entity.Property(p => p.Birthdate).HasColumnType("date").IsRequired(true);
            entity.Property(x => x.IsActive);
            // Metadata
            entity.Property(x => x.PostAt).HasMaxLength(19).IsRequired(true);
            entity.Property(x => x.PostUser).HasMaxLength(255).IsRequired(true);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(255);
            // FK Constraints
            entity.HasOne(x => x.Nationality).WithMany(x => x.ShipCrews).HasForeignKey(x => x.NationalityId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(x => x.Ship).WithMany(x => x.ShipCrews).HasForeignKey(x => x.ShipId).OnDelete(DeleteBehavior.Restrict);
        }

    }

}