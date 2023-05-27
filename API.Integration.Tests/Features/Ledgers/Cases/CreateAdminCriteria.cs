using System.Collections;
using System.Collections.Generic;

namespace Ledgers {

    public class CreateAdminCriteria : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Criteria();
        }

        private static object[] Criteria() {
            return new object[] {
                new TestLedgerCriteria {
                    FromDate = "2023-05-01",
                    ToDate = "2023-05-01",
                    CustomerIds = new int[] {69, 78},
                    DestinationIds = new int[] {3, 8, 6, 7, 1, 9},
                    PortIds = new int[] {1, 2},
                    ShipIds = new int?[] {6}
                }
            };
        }

    }

}
