using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Genders {

    internal class GendersConfig : IEntityTypeConfiguration<Gender> {

        public void Configure(EntityTypeBuilder<Gender> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.IsActive);
            // Metadata
            entity.Property(x => x.PostAt).HasMaxLength(19);
            entity.Property(x => x.PostUser).HasMaxLength(256);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(256);
        }

    }

}