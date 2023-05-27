using System.Collections;
using System.Collections.Generic;

namespace Embarkation {

    public class CreateEmbarkationCriteria : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Criteria();
        }

        private static object[] Criteria() {
            return new object[] {
                new TestEmbarkationCriteria {
                    Date = "2022-05-01",
                    DestinationIds = new int[] {1, 2, 3},
                    PortIds = new int[] {1},
                    ShipIds = new int?[] {6}
                }
            };
        }

    }

}
