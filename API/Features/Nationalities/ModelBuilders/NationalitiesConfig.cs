using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Nationalities {

    public class NationalitiesConfig : IEntityTypeConfiguration<Nationality> {

        public void Configure(EntityTypeBuilder<Nationality> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // Fields
            entity.Property(x => x.Description).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Code).HasMaxLength(10).IsRequired(true);
            entity.Property(x => x.IsActive).IsRequired(true);
            entity.Property(x => x.PostAt).HasMaxLength(19);
            entity.Property(x => x.PostUser).HasMaxLength(255);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(255);
        }

    }

}