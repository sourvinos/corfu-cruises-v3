using API.Features.Billing.Invoices;
using API.Features.Billing.Receipts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Features.Billing.Transactions {

    internal class TransactionConfig : IEntityTypeConfiguration<Transaction> {

        public void Configure(EntityTypeBuilder<Transaction> entity) {
            entity.HasKey(x => x.InvoiceId);
            entity.HasDiscriminator<int>("DiscriminatorId")
                .HasValue<Invoice>(1)
                .HasValue<Receipt>(2);
        }

    }

}