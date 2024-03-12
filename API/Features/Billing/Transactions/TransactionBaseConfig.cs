using API.Features.Billing.Invoices;
using API.Features.Billing.Receipts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Billing.Transactions {

    internal class TransactionConfig : IEntityTypeConfiguration<TransactionBase> {

        public void Configure(EntityTypeBuilder<TransactionBase> entity) {
            entity.HasKey(x => x.InvoiceId);
            entity.HasDiscriminator<int>("DiscriminatorId")
                .HasValue<TransactionBase>(0)
                .HasValue<Invoice>(1)
                .HasValue<Receipt>(2);
        }

    }

}