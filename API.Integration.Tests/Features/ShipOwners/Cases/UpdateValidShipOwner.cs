using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace API.IntegrationTests.ShipOwners {

    public class UpdateValidShipOwner : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestShipOwner {
                    Id = 5,
                    Description = Helpers.CreateRandomString(128),
                    RowVersion = "2023-09-07 09:56:05"
                }
            };
        }

    }

}
