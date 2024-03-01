using System.Collections;
using System.Collections.Generic;
using Transactions;

namespace Transactions {

    public class CreateValidTransaction : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestTransaction {
                    CustomerId = 1,
                    DocumentTypeId = 1,
                    PaymentMethodId = 1,
                    Date = "2024-02-10",
                    No = 1,
                    NetAmount = 100,
                    VatAmount = 0,
                    VatPercent = 0
                }
            };
        }

    }

}
