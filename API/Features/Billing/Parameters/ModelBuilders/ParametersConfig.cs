using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Billing.Parameters {

    internal class BillingParametersConfig : IEntityTypeConfiguration<BillingParameter> {

        public void Configure(EntityTypeBuilder<BillingParameter> entity) {
            // PK
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            // Fields
            entity.Property(x => x.AadeDemoUrl).HasMaxLength(256);
            entity.Property(x => x.AadeDemoUsername).HasMaxLength(256);
            entity.Property(x => x.AadeDemoApiKey).HasMaxLength(256);
            entity.Property(x => x.AadeLiveUrl).HasMaxLength(256);
            entity.Property(x => x.AadeLiveUsername).HasMaxLength(256);
            entity.Property(x => x.AadeLiveApiKey).HasMaxLength(256);
            // Metadata
            entity.Property(x => x.PostAt).HasMaxLength(19).IsRequired(true);
            entity.Property(x => x.PostUser).HasMaxLength(255).IsRequired(true);
            entity.Property(x => x.PutAt).HasMaxLength(19);
            entity.Property(x => x.PutUser).HasMaxLength(255);
        }

    }

}