using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Customers {

    internal class CustomersConfig : IEntityTypeConfiguration<Customer> {

        public void Configure(EntityTypeBuilder<Customer> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Profession).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Address).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Phones).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.PersonInCharge).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Email).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.IsActive);
            // Metadata
            entity.Property(x => x.PostAt).HasMaxLength(19);
            entity.Property(x => x.PostUser).HasMaxLength(256);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(256);
        }

    }

}