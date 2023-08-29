using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Parameters {

    internal class ParametersConfig : IEntityTypeConfiguration<Parameter> {

        public void Configure(EntityTypeBuilder<Parameter> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // Fields
            entity.Property(x => x.ClosingTime).HasMaxLength(5).IsRequired(true);
            entity.Property(x => x.Phones).HasMaxLength(128).IsRequired(true);
            entity.Property(x => x.Email).HasMaxLength(128).IsRequired(true);
        }

    }

}