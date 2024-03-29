using System.Collections;
using System.Collections.Generic;

namespace Prices {

    public class UpdateValidPrice : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestPrice {
                    Id = 1,
                    CustomerId = 1,
                    DestinationId = 1,
                    PortId = 1,
                    From = "2023-01-01",
                    To = "2023-12-31",
                    AdultsWithTransfer = 0.01M,
                    AdultsWithoutTransfer = 0.02M,
                    KidsWithTransfer = 0.03M,
                    KidsWithoutTransfer = 0.04M,
                    PutAt = "2024-01-19 07:45:00"
                }
            };
        }

    }

}
