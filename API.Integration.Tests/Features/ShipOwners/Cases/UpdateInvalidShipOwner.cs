using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace ShipOwners {

    public class UpdateInvalidShipOwner : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ShipOwner_Must_Not_Be_Already_Updated();
        }

        private static object[] ShipOwner_Must_Not_Be_Already_Updated() {
            return new object[] {
                new TestShipOwner {
                    StatusCode = 415,
                    Id = 5,
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2023-09-07 09:57:05"
                }
            };
        }

    }

}
