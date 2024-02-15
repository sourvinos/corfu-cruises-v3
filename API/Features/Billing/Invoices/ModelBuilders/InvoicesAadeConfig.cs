using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Billing.Invoices {

    internal class InvoicesAadeConfig : IEntityTypeConfiguration<InvoiceAade> {

        public void Configure(EntityTypeBuilder<InvoiceAade> entity) {
            // PK
            entity.HasKey("InvoiceId");
        }

    }

}