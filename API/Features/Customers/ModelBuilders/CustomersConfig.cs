using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Customers {

    internal class CustomersConfig : IEntityTypeConfiguration<Customer> {

        public void Configure(EntityTypeBuilder<Customer> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.PostUserId).HasMaxLength(36).IsRequired(true);
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Profession).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Address).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Phones).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.PersonInCharge).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.Email).HasDefaultValue("").HasMaxLength(128);
            entity.Property(x => x.IsActive);
            entity.Property(x => x.PostAt).HasMaxLength(19);
            // FK Constraints
            entity.HasOne(x => x.User).WithMany(x => x.Customers).HasForeignKey(x => x.PostUserId).OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(x => x.User).WithMany(x => x.Customers).HasForeignKey(x => x.PutUserId).OnDelete(DeleteBehavior.Restrict);
        }

    }

}