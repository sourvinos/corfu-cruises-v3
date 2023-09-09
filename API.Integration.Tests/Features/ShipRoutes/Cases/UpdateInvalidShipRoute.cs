using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace ShipRoutes {

    public class UpdateInvalidShipRoute : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ShipRoute_Must_Not_Be_Already_Updated();
        }

        private static object[] ShipRoute_Must_Not_Be_Already_Updated() {
            return new object[] {
                new TestShipRoute {
                    StatusCode = 415,
                    Id = 5,
                    Description = Helpers.CreateRandomString(128),
                    FromPort = Helpers.CreateRandomString(128),
                    FromTime = "08:00",
                    ToPort =  Helpers.CreateRandomString(128),
                    ToTime = "10:00",
                    RowVersion = "2023-09-07 09:57:05"
                }
            };
        }

    }

}
