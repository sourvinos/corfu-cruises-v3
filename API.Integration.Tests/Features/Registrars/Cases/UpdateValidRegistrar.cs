using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Registrars {

    public class UpdateValidRegistrar : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestRegistrar {
                    Id = 1,
                    ShipId = 7,
                    Fullname = Helpers.CreateRandomString(128),
                    RowVersion = "2023-09-07 09:54:56"
                }
            };
        }

    }

}
