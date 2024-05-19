using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Billing.Retail {

    internal class RetailsAadeConfig : IEntityTypeConfiguration<RetailAade> {

        public void Configure(EntityTypeBuilder<RetailAade> entity) {
            // PK
            entity.HasKey("InvoiceId");
        }

    }

}