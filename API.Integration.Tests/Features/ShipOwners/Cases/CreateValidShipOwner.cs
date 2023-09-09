using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace ShipOwners {

    public class CreateValidShipOwner : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestShipOwner {
                    Description = Helpers.CreateRandomString(128)
                }
            };
        }

    }

}
