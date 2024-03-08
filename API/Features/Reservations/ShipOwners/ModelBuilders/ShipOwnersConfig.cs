using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Reservations.ShipOwners {

    internal class ShipOwnersConfig : IEntityTypeConfiguration<ShipOwner> {

        public void Configure(EntityTypeBuilder<ShipOwner> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.NationalityId).IsRequired(true);
            entity.Property(x => x.TaxOfficeId).IsRequired(true);
            entity.Property(x => x.VatRegimeId).IsRequired(true);
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.VatNumber).HasMaxLength(36).IsRequired(true);
            entity.Property(x => x.Branch).IsRequired(true);
            entity.Property(x => x.Profession).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Street).HasMaxLength(128).IsRequired();
            entity.Property(x => x.PostalCode).HasMaxLength(10).IsRequired();
            entity.Property(x => x.City).HasMaxLength(128).IsRequired();
            entity.Property(x => x.Phones).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.PersonInCharge).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Email).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.DemoUrl).HasDefaultValue("").HasMaxLength(256);
            entity.Property(x => x.DemoUsername).HasDefaultValue("").HasMaxLength(256);
            entity.Property(x => x.DemoSubscriptionKey).HasDefaultValue("").HasMaxLength(256);
            entity.Property(x => x.LiveUrl).HasDefaultValue("").HasMaxLength(256);
            entity.Property(x => x.LiveUsername).HasDefaultValue("").HasMaxLength(256);
            entity.Property(x => x.LiveSubscriptionKey).HasDefaultValue("").HasMaxLength(256);
            entity.Property(x => x.IsActive).IsRequired(true);
            // Metadata
            entity.Property(x => x.PostAt).HasMaxLength(19).IsRequired(true);
            entity.Property(x => x.PostUser).HasMaxLength(255).IsRequired(true);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(255);
        }

    }

}