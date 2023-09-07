using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Ships {

    public class UpdateValidShip : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestShip {
                    Id = 6,
                    ShipOwnerId = 5,
                    Description = Helpers.CreateRandomString(15),
                    Abbreviation = Helpers.CreateRandomString(5),
                    RowVersion= "2023-09-07 09:56:41"
                }
            };
        }

    }

}
