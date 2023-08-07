using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Parameters {

    internal class ParametersConfig : IEntityTypeConfiguration<Parameter> {

        public void Configure(EntityTypeBuilder<Parameter> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // FKs
            entity.Property(x => x.UserId).HasMaxLength(36).IsRequired(true);
            // Fields
            entity.Property(x => x.ClosingTime).HasMaxLength(5).IsRequired(true);
            entity.Property(x => x.LastUpdate).HasMaxLength(19);
            // FK Constraints
            entity.HasOne(x => x.User).WithMany(x => x.Parameters).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Restrict);
        }

    }

}